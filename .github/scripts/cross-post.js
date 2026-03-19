const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BASE_URL = 'https://tiluckdave.in';
const TRACKING_FILE = '.github/cross-posted.json';

// Load tracking data
let tracked = {};
if (fs.existsSync(TRACKING_FILE)) {
  tracked = JSON.parse(fs.readFileSync(TRACKING_FILE, 'utf-8'));
}

const MODE = process.env.MODE || 'diff';
const newFilesRaw = process.env.NEW_FILES || '';
const modifiedFilesRaw = process.env.MODIFIED_FILES || '';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Attribute extraction from JSX-like attribute strings
// ---------------------------------------------------------------------------

function extractAttr(attrsString, name) {
  const patterns = [
    new RegExp(`${name}="([^"]*)"`, 's'),       // name="value"
    new RegExp(`${name}='([^']*)'`, 's'),        // name='value'
    new RegExp(`${name}=\\{"([^"]*)"\\}`, 's'),  // name={"value"}
    new RegExp(`${name}=\\{'([^']*)'\\}`, 's'),  // name={'value'}
    new RegExp(`${name}=\\{([^}]*)\\}`, 's'),    // name={value}
  ];
  for (const pattern of patterns) {
    const match = attrsString.match(pattern);
    if (match) return match[1].trim();
  }
  return null;
}

// ---------------------------------------------------------------------------
// Tag helpers — each platform has different rules
// ---------------------------------------------------------------------------

function devtoTags(tags) {
  // Dev.to: max 4 tags, lowercase, alphanumeric only (no hyphens), max 30 chars
  return (tags || [])
    .slice(0, 4)
    .map(t => t.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .filter(t => t.length <= 30);
}

function hashnodeTags(tags) {
  // Hashnode expects { slug, name } objects
  return (tags || []).map(t => ({
    slug: t.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-'),
    name: t,
  }));
}

function coverImageUrl(frontmatter, slug) {
  // Use explicit image from frontmatter, or fall back to generated OG image
  if (frontmatter.image) return absolutizeUrl(frontmatter.image);
  return `${BASE_URL}/articles/${slug}/opengraph-image`;
}

function absolutizeUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${BASE_URL}${url}`;
  if (url.startsWith('./')) return `${BASE_URL}/${url.slice(2)}`;
  return `${BASE_URL}/${url}`;
}

// ---------------------------------------------------------------------------
// MDX → Markdown sanitizer
//
// Converts custom JSX components to their markdown equivalents instead of
// stripping them. Only truly unknown components get a fallback link.
// ---------------------------------------------------------------------------

function sanitizeMdx(content, slug) {
  let result = content;

  // 1. Remove import/export statements
  result = result.replace(/^import\s+.*$/gm, '');
  result = result.replace(/^export\s+.*$/gm, '');

  // 2. <Figure src="..." alt="..." caption="..." /> → ![alt](url) + caption
  result = result.replace(/<Figure\s+([^>]*?)\/>/gs, (_match, attrs) => {
    const src = extractAttr(attrs, 'src');
    const alt = extractAttr(attrs, 'alt') || '';
    const caption = extractAttr(attrs, 'caption');
    const absoluteSrc = absolutizeUrl(src);
    let md = `![${alt}](${absoluteSrc})`;
    if (caption) md += `\n*${caption}*`;
    return md;
  });

  // Also handle <Figure ...>children</Figure> if ever used
  result = result.replace(/<Figure\s+([^>]*)>([\s\S]*?)<\/Figure>/gs, (_match, attrs) => {
    const src = extractAttr(attrs, 'src');
    const alt = extractAttr(attrs, 'alt') || '';
    const caption = extractAttr(attrs, 'caption');
    const absoluteSrc = absolutizeUrl(src);
    let md = `![${alt}](${absoluteSrc})`;
    if (caption) md += `\n*${caption}*`;
    return md;
  });

  // 3. <Callout type="...">content</Callout> → blockquote
  result = result.replace(/<Callout\s+type=["'](\w+)["']>([\s\S]*?)<\/Callout>/g, (_match, type, inner) => {
    const labels = { info: 'Info', tip: 'Tip', warning: 'Warning', danger: 'Danger' };
    const label = labels[type] || type.charAt(0).toUpperCase() + type.slice(1);
    const trimmed = inner.trim();
    const lines = trimmed.split('\n');
    return lines
      .map((line, i) => (i === 0 ? `> **${label}:** ${line.trim()}` : `> ${line.trim()}`))
      .join('\n');
  });

  // 4. <Steps> / <Step> → numbered bold headings
  result = result.replace(/<Steps>/g, '');
  result = result.replace(/<\/Steps>/g, '');
  result = result.replace(/<Step\s+([^>]*)>([\s\S]*?)<\/Step>/g, (_match, attrs, inner) => {
    const n = extractAttr(attrs, 'n') || '';
    const title = extractAttr(attrs, 'title') || '';
    return `**Step ${n}: ${title}**\n\n${inner.trim()}`;
  });

  // 5. <LinkPreview url="..." title="..." description="..." /> → markdown link
  result = result.replace(/<LinkPreview\s+([^>]*?)\/>/g, (_match, attrs) => {
    const url = extractAttr(attrs, 'url');
    const title = extractAttr(attrs, 'title') || url;
    const description = extractAttr(attrs, 'description');
    let md = `[${title}](${url})`;
    if (description) md += ` — ${description}`;
    return md;
  });
  result = result.replace(/<LinkPreview\s+([^>]*)>([\s\S]*?)<\/LinkPreview>/g, (_match, attrs, children) => {
    const url = extractAttr(attrs, 'url');
    const title = extractAttr(attrs, 'title') || children.trim() || url;
    return `[${title}](${url})`;
  });

  // 6. <CodeTabs> / <FileTree> — strip wrapper, keep inner content
  result = result.replace(/<CodeTabs>/g, '');
  result = result.replace(/<\/CodeTabs>/g, '');
  result = result.replace(/<FileTree>/g, '');
  result = result.replace(/<\/FileTree>/g, '');

  // 7. Fallback: remaining unknown self-closing JSX
  result = result.replace(
    /<[A-Z][A-Za-z]*[^/]*\/>/g,
    `\n*[See the original post for interactive content](${BASE_URL}/articles/${slug})*\n`,
  );
  // Fallback: remaining unknown JSX with children
  result = result.replace(
    /<[A-Z][A-Za-z]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z]*>/g,
    `\n*[See the original post for interactive content](${BASE_URL}/articles/${slug})*\n`,
  );

  // 8. Absolutize remaining markdown image paths
  result = result.replace(/!\[([^\]]*)\]\(\.\/([^)]+)\)/g, `![$1](${BASE_URL}/images/$2)`);
  result = result.replace(/!\[([^\]]*)\]\(\/([^)]+)\)/g, `![$1](${BASE_URL}/$2)`);

  // 9. Absolutize internal markdown links  (but not anchors like #heading)
  result = result.replace(/\[([^\]]*)\]\(\/([^)]+)\)/g, `[$1](${BASE_URL}/$2)`);

  // 10. Clean up excessive blank lines
  result = result.replace(/\n{3,}/g, '\n\n');

  return result.trim();
}

// ---------------------------------------------------------------------------
// Dev.to API
// ---------------------------------------------------------------------------

async function fetchDevToId(slug) {
  const canonicalUrl = `${BASE_URL}/articles/${slug}`;
  let page = 1;
  while (page <= 10) {
    const res = await fetch(`https://dev.to/api/articles/me/all?per_page=100&page=${page}`, {
      headers: { 'api-key': process.env.DEVTO_API_KEY },
    });
    if (!res.ok) break;
    const articles = await res.json();
    if (articles.length === 0) break;
    const found = articles.find(a => a.canonical_url === canonicalUrl);
    if (found) return found.id;
    page++;
  }
  return null;
}

function buildDevToBody(frontmatter, slug, markdown) {
  const canonicalUrl = `${BASE_URL}/articles/${slug}`;
  const body = {
    article: {
      title: frontmatter.title,
      body_markdown: `*This article was originally published at [tiluckdave.in](${canonicalUrl})*\n\n${markdown}`,
      published: true,
      canonical_url: canonicalUrl,
      tags: devtoTags(frontmatter.tags),
      description: frontmatter.description || '',
      main_image: coverImageUrl(frontmatter, slug),
    },
  };
  return body;
}

async function postToDevTo(frontmatter, slug, markdown) {
  const body = buildDevToBody(frontmatter, slug, markdown);
  const res = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: { 'api-key': process.env.DEVTO_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Dev.to POST ${res.status}: ${text}`);
  }
  return res.json();
}

async function updateDevTo(articleId, frontmatter, slug, markdown) {
  const body = buildDevToBody(frontmatter, slug, markdown);
  delete body.article.published; // don't toggle published state on update
  const res = await fetch(`https://dev.to/api/articles/${articleId}`, {
    method: 'PUT',
    headers: { 'api-key': process.env.DEVTO_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Dev.to PUT ${res.status}: ${text}`);
  }
  return res.json();
}

// ---------------------------------------------------------------------------
// Hashnode API
// ---------------------------------------------------------------------------

async function hashnodeGql(query, variables) {
  const res = await fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: {
      Authorization: process.env.HASHNODE_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Hashnode ${res.status}: ${text}`);
  }
  return res.json();
}

async function fetchHashnodeId(slug) {
  const query = `
    query FetchPost($pubId: ObjectId!, $slug: String!) {
      publication(id: $pubId) {
        post(slug: $slug) { id }
      }
    }
  `;
  try {
    const data = await hashnodeGql(query, {
      pubId: process.env.HASHNODE_PUBLICATION_ID,
      slug,
    });
    return data?.data?.publication?.post?.id || null;
  } catch {
    return null;
  }
}

function buildHashnodeMarkdown(slug, markdown) {
  const canonicalUrl = `${BASE_URL}/articles/${slug}`;
  return `*Originally published at [tiluckdave.in](${canonicalUrl})*\n\n${markdown}`;
}

async function postToHashnode(frontmatter, slug, markdown) {
  const canonicalUrl = `${BASE_URL}/articles/${slug}`;
  const query = `
    mutation PublishPost($input: PublishPostInput!) {
      publishPost(input: $input) {
        post { id url }
      }
    }
  `;
  const input = {
    title: frontmatter.title,
    contentMarkdown: buildHashnodeMarkdown(slug, markdown),
    originalArticleURL: canonicalUrl,
    publicationId: process.env.HASHNODE_PUBLICATION_ID,
    tags: hashnodeTags(frontmatter.tags),
    coverImageOptions: { coverImageURL: coverImageUrl(frontmatter, slug) },
  };
  return hashnodeGql(query, { input });
}

async function updateHashnode(postId, frontmatter, slug, markdown) {
  const canonicalUrl = `${BASE_URL}/articles/${slug}`;
  const query = `
    mutation UpdatePost($input: UpdatePostInput!) {
      updatePost(input: $input) {
        post { id url }
      }
    }
  `;
  const input = {
    id: postId,
    title: frontmatter.title,
    contentMarkdown: buildHashnodeMarkdown(slug, markdown),
    originalArticleURL: canonicalUrl,
  };
  if (frontmatter.image) {
    input.coverImageOptions = { coverImageURL: absolutizeUrl(frontmatter.image) };
  }
  return hashnodeGql(query, { input });
}

// ---------------------------------------------------------------------------
// Process a single article — create or update
// ---------------------------------------------------------------------------

async function processArticle(file, isUpdate) {
  const slug = path.basename(file, '.mdx');
  const raw = fs.readFileSync(file, 'utf-8');
  const { data: frontmatter, content } = matter(raw);

  if (!frontmatter.published) {
    console.log(`Skipping ${slug} — not published`);
    return;
  }

  const markdown = sanitizeMdx(content, slug);
  const entry = tracked[slug] || { slug };

  if (isUpdate) {
    console.log(`Updating: ${slug}`);

    // --- Dev.to ---
    try {
      let devtoId = entry.devtoId;
      if (!devtoId) {
        console.log(`  Fetching Dev.to article ID for ${slug}...`);
        devtoId = await fetchDevToId(slug);
        await sleep(1000);
      }
      if (devtoId) {
        const result = await updateDevTo(devtoId, frontmatter, slug, markdown);
        entry.devtoId = result.id || devtoId;
        entry.devto = result.url || entry.devto;
        console.log(`  Dev.to: updated — ${entry.devto}`);
      } else {
        console.log(`  Dev.to: not found, creating new post...`);
        const result = await postToDevTo(frontmatter, slug, markdown);
        entry.devtoId = result.id;
        entry.devto = result.url || `https://dev.to/article/${result.id}`;
        console.log(`  Dev.to: created — ${entry.devto}`);
      }
    } catch (err) {
      console.error(`  Dev.to failed for ${slug}:`, err.message);
    }

    await sleep(2500);

    // --- Hashnode ---
    try {
      let hashnodeId = entry.hashnodeId;
      if (!hashnodeId) {
        console.log(`  Fetching Hashnode post ID for ${slug}...`);
        hashnodeId = await fetchHashnodeId(slug);
        await sleep(1000);
      }
      if (hashnodeId) {
        const result = await updateHashnode(hashnodeId, frontmatter, slug, markdown);
        entry.hashnodeId = result.data?.updatePost?.post?.id || hashnodeId;
        entry.hashnode = result.data?.updatePost?.post?.url || entry.hashnode;
        console.log(`  Hashnode: updated — ${entry.hashnode}`);
      } else {
        console.log(`  Hashnode: not found, creating new post...`);
        const result = await postToHashnode(frontmatter, slug, markdown);
        entry.hashnodeId = result.data?.publishPost?.post?.id;
        entry.hashnode = result.data?.publishPost?.post?.url;
        console.log(`  Hashnode: created — ${entry.hashnode}`);
      }
    } catch (err) {
      console.error(`  Hashnode failed for ${slug}:`, err.message);
    }
  } else {
    // --- New article ---
    if (tracked[slug]) {
      console.log(`Skipping ${slug} — already cross-posted`);
      return;
    }

    console.log(`Cross-posting: ${slug}`);

    try {
      const result = await postToDevTo(frontmatter, slug, markdown);
      entry.devtoId = result.id;
      entry.devto = result.url || `https://dev.to/article/${result.id}`;
      console.log(`  Dev.to: posted — ${entry.devto}`);
    } catch (err) {
      console.error(`  Dev.to failed for ${slug}:`, err.message);
    }

    await sleep(2500);

    try {
      const result = await postToHashnode(frontmatter, slug, markdown);
      entry.hashnodeId = result.data?.publishPost?.post?.id;
      entry.hashnode = result.data?.publishPost?.post?.url;
      console.log(`  Hashnode: posted — ${entry.hashnode}`);
    } catch (err) {
      console.error(`  Hashnode failed for ${slug}:`, err.message);
    }
  }

  entry.updatedAt = new Date().toISOString();
  if (!entry.postedAt) entry.postedAt = entry.updatedAt;
  tracked[slug] = entry;

  await sleep(2500);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  if (MODE === 'all') {
    // Re-process every published article (manual trigger)
    const articlesDir = 'content/articles';
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'));
    for (const file of files) {
      const filePath = path.join(articlesDir, file);
      const slug = path.basename(file, '.mdx');
      await processArticle(filePath, !!tracked[slug]);
    }
  } else {
    // Normal push — process new and modified files
    const newFiles = newFilesRaw.split('\n').filter(Boolean);
    for (const file of newFiles) {
      await processArticle(file, false);
    }

    const modifiedFiles = modifiedFilesRaw.split('\n').filter(Boolean);
    for (const file of modifiedFiles) {
      await processArticle(file, true);
    }
  }

  fs.writeFileSync(TRACKING_FILE, JSON.stringify(tracked, null, 2));
  console.log('\nTracking file updated.');
}

main().catch(err => {
  console.error('Cross-posting failed:', err);
  process.exit(1);
});

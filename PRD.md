# PRD — tiluckdave.in

**Author:** Tilak Dave
**Version:** 2.0
**Last Updated:** March 10, 2026
**Status:** Final Draft

---

## 1. Overview

A minimal, fast, content-first personal website that serves two purposes: (a) showcase work, writing, and personality, and (b) act as a lead-generation engine for high-value freelance software clients globally.

**Design philosophy:** Monochrome, typographic, content-first — inspired by rauchg.com, leerob.com, and paco.me. No cards, no flashy animations, no decorative images. The site should feel like it was built by someone who deeply understands software. Typography does all the heavy lifting. Maximum content, minimum chrome.

---

## 2. Domain Architecture

| URL | Purpose |
|-----|---------|
| `tiluckdave.in` | Primary domain — personal site |
| `www.tiluckdave.in` | 301 redirect → `tiluckdave.in` |
| `tiluckdave.in/hire` | Freelance services (subdirectory for SEO authority consolidation) |
| `hire.tiluckdave.in` | Vanity redirect → 301 → `tiluckdave.in/hire` (for business cards, bios) |

**Why subdirectory over subdomain for /hire:** Subdirectories share link equity with the root domain. Every backlink to articles or projects strengthens the services pages. One sitemap, one robots.txt, one Search Console property. HotPads saw a 98% organic traffic increase after moving from subdomain to subdirectory. For a personal domain with modest initial authority, splitting across subdomains is actively harmful.

**Implementation:** Single Next.js app. Middleware handles `hire.tiluckdave.in` → `tiluckdave.in/hire` redirect. The `/hire` routes have their own layout, slightly adjusted design language, and independent SEO metadata.

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js** (App Router, latest) | SSR/SSG for SEO, great DX |
| Styling | **Tailwind CSS v4** | Utility-first, minimal bundle, fast iteration |
| Content | **MDX** (local files, `gray-matter` for frontmatter) | Articles AND projects as MDX — no CMS, version-controlled, custom components |
| OG Images | **next/og** (Satori) | Dynamic text-based OG images generated at build time from MDX frontmatter |
| Deployment | **Vercel** | Zero-config deploys, edge network, built-in analytics |
| Analytics | **Vercel Analytics** only | Cookieless, lightweight, no consent banner needed |
| Booking | **Cal.com** (free tier, latest embed) | Unlimited bookings, event types, workflow automation |
| Email | **Resend** | Contact form submissions to personal email |
| Domain | `tiluckdave.in` | Already owned, mail forwarding configured for *@tiluckdave.in |
| Cross-posting | **GitHub Actions** + Dev.to API + Hashnode GraphQL API | Automated syndication with canonical URLs |

**Why no CMS:** The entire site lives in a single Git repo. Adding content is pushing an `.mdx` file. No database, no admin panel, no attack surface. CHANGELOG.md in the repo tracks site changes.

---

## 4. Design Language

### 4.1 Foundational Principles

1. **No cards.** Content lives directly on the page surface. No elevated containers, no shadows, no bordered boxes.
2. **No decorative images.** The only images on the site are: the about page photo, dynamically generated OG images (text-only PNGs), and images within article content.
3. **No animations** beyond hover states (underline weight change on links) and optional subtle page transitions (View Transitions API, progressive enhancement).
4. **Single-column layout.** Max-width ~640px for reading content, centered. No sidebars, no multi-column grids.
5. **Text is the interface.** Navigation, content, CTAs — everything is text. Links are always underlined.

### 4.2 Color Palette

**Theme:** System preference detection only. No manual toggle. `prefers-color-scheme` media query.

**Light mode:**

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#F5F5F0` | Warm white page background |
| `--bg-code` | `#E8E4DF` | Code block background |
| `--text-primary` | `#2A2A28` | Body text — warm near-black |
| `--text-secondary` | `#9A8A7E` | Metadata, timestamps, secondary info — warm taupe |
| `--text-muted` | `#B0A999` | Greige for least-important text |
| `--accent` | `#B08A57` | Links, highlights — warm brass (old money gold) |
| `--accent-hover` | `#8C7C4A` | Link hover state — darker brass |
| `--border` | `rgba(176, 169, 153, 0.3)` | Separators, dividers |

**Dark mode:**

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#111111` | Soft black (never pure #000) |
| `--bg-code` | `#1E1E1E` | Code block background |
| `--text-primary` | `#E8E4DF` | Body text — warm off-white (never pure #FFF) |
| `--text-secondary` | `#B0A999` | Greige secondary text |
| `--text-muted` | `#8A8478` | Subdued metadata |
| `--accent` | `#C9B06B` | Links — antique brass |
| `--accent-hover` | `#D4C19C` | Link hover — lighter gold |
| `--border` | `rgba(176, 169, 153, 0.12)` | Barely-there borders |

**Accent usage rules:**

- Accent color appears ONLY on links, the hire CTA, and active nav indicators.
- Never use bright saturated gold (#FFD700). The brass tones have brown/gray undertones — aged brass, not bling.
- `rgba(176, 138, 87, 0.07)` at 5–8% opacity for subtle hover backgrounds where needed.
- No colored badges, no colored tags, no colored backgrounds.

### 4.3 Typography

**Zero external font requests.** System font stack only.

```css
:root {
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji";

  --font-mono: ui-monospace, SFMono-Regular, "Cascadia Code",
    Menlo, Consolas, "Liberation Mono", monospace;
}
```

This renders SF Pro on Apple, Segoe UI on Windows, Roboto on Android, Adwaita Sans on GNOME Linux. The mono stack renders SF Mono on macOS, Cascadia Code on Windows, Liberation Mono on Linux.

**Type scale:**

| Element | Size | Weight | Line-height | Letter-spacing | Color |
|---------|------|--------|-------------|----------------|-------|
| H1 (page titles) | 36px | 700 | 1.15 | -0.02em | `--text-primary` |
| H2 (section heads) | 24px | 600 | 1.3 | -0.01em | `--text-primary` |
| H3 (sub-sections) | 20px | 600 | 1.4 | 0 | `--text-primary` |
| Body text | 17px | 400 | 1.7 | 0 | `--text-primary` |
| Article body | 18px | 400 | 1.75 | 0 | `--text-primary` |
| Code inline | 15px | 400 | inherit | 0 | `--text-primary` on `--bg-code` |
| Code blocks | 14px | 400 | 1.6 | 0 | GitHub syntax theme |
| Metadata | 14px | 400 | 1.5 | 0 | `--text-secondary` |
| Nav links | 15px | 400 | 1 | 0 | `--text-secondary`, `--text-primary` when active |

**Spacing:** 8px base unit. Generous vertical whitespace between sections (min 48px). Paragraph spacing: 24px.

### 4.4 Links & Interactions

- All links: `text-decoration: underline` always, colored with `--accent`.
- Hover: `font-weight` shifts from 400 → 500 (use `font-variation-settings` or optical size adjustment to prevent layout shift). No color change on hover.
- Code blocks: GitHub light/dark syntax theme (match system preference). **Copy button** on every code block (top-right, appears on hover).
- No tooltips, no modals, no dropdowns, no accordions anywhere on the site.

### 4.5 OG Images

Dynamically generated at build time using `next/og` (Satori). Text-only on a solid background.

**Template:**

- Size: 1200×630px
- Background: `#111111` (dark, works well as social preview)
- Title: 36–48px, bold, warm off-white (`#E8E4DF`), max 2 lines
- Label: "Article" or "Project" in 16px, `--text-secondary`, top-left
- Domain: "tiluckdave.in" in 16px, `--text-muted`, bottom-right
- Date (articles only): 16px, `--text-muted`, bottom-left
- No gradients, no decorations, no images within the OG image

**Implementation:** `opengraph-image.tsx` files in each route segment. Reads frontmatter from MDX via `gray-matter`. Static font file (Inter Bold TTF, bundled) for consistent rendering since system fonts aren't available in Satori. Pre-generated at build time via `generateStaticParams`.

---

## 5. Site Architecture & Pages

```
tiluckdave.in/                        → Home
tiluckdave.in/about                   → About
tiluckdave.in/projects                → Projects listing
tiluckdave.in/articles                → Articles listing
tiluckdave.in/articles/[slug]         → Individual article
tiluckdave.in/hire                    → Services overview
tiluckdave.in/hire/work               → Proof of work / selected case studies
tiluckdave.in/hire/book               → Cal.com booking page
tiluckdave.in/hire/contact            → Contact form (freelance-focused)
tiluckdave.in/privacy                 → Privacy policy
tiluckdave.in/rss.xml                 → RSS feed (articles only)
tiluckdave.in/sitemap.xml             → Auto-generated sitemap
tiluckdave.in/robots.txt              → Crawl directives
tiluckdave.in/llms.txt                → LLM discoverability file
```

---

## 6. Page Specifications — Main Site

### 6.1 Home — `/`

First impression. Communicates competence in under 3 seconds.

**Content (top to bottom):**

1. **Name** — "Tilak Dave" in H1. Large, bold. Nothing else on the first visual line.

2. **Description** — 2 lines, self-written. Plaintext, no formatting. Directly below the name. This is NOT a tagline — it's a genuine, specific description of what you do and care about. *(Tilak to write.)*

3. **Selected Projects** — 3 projects, listed as plain text rows. Each row: project name (linked, underlined), one-line description, year. No cards, no icons, no tech tags. Followed by a "All projects →" link to `/projects`.

4. **Recent Articles** — 3 articles, listed as plain text rows. Each row: article title (linked), date. Followed by "All articles →" link to `/articles`.

5. **Hire CTA** — One line of text at the bottom: *"Looking to build something? Let's talk →"* linking to `/hire`. Same text style as body, accent-colored link. Not a button. Not visually elevated. Just present.

**What is NOT on this page:** Photo, social links, tech stack list, testimonials, stats, gradients, hero images, call-to-action buttons.

### 6.2 About — `/about`

**Content:**

1. **Bio** — Self-written, 2–3 paragraphs. Conversational, human. *(Tilak to write.)*

2. **Photo** — One professional photo. Not massive — roughly 200×200px or similar. Positioned naturally within/beside the bio text. No rounded corners, no border effects.

3. **Work Experience** — Simple list. Each entry: role, company, duration. One line description max. *(Tilak to populate — format provided, content is his.)*

4. **Now** — A section titled "Now" showing what you're currently working on, reading, interested in. Updated manually whenever you want. This keeps the site feeling alive even between articles.

5. **Fun Stuff** — Bullet points or short paragraph of personal interests, hot takes, personality. *(Tilak to write. Examples: RCB fandom, TEDx, fitness, etc.)*

6. **Support** — Small section at bottom. Three plain text links: Buy Me a Coffee, GitHub Sponsors, PayPal. Framing: *"If my work or writing helped you"* followed by the links. No icons, no embed widgets.

### 6.3 Projects — `/projects`

Projects are defined in MDX files at `content/projects/`.

**Frontmatter schema:**

```yaml
title: "Project Name"
description: "One-line description for listing"
liveUrl: "https://..."
repoUrl: "https://github.com/..."
date: "2026-01-15"
featured: true
```

**Listing layout:** Flat, chronological list (newest first). Each entry is a row of text: project name, description, and two small links — "Live ↗" and "Code ↗". Featured projects listed first. No filtering, no tags, no categories, no detail pages.

### 6.4 Articles — `/articles`

Articles are MDX files at `content/articles/`.

**Frontmatter schema:**

```yaml
title: "Article Title"
date: "2026-03-09"
description: "SEO meta description (150–160 chars)"
tags: ["mcp", "integrations"]
published: true
series: "Building MCP Servers"  # optional, for future series support
seriesOrder: 1                  # optional
```

**Listing page:** Chronological list, newest first. Each row: title (linked), date. Tags not shown on listing — keep it clean.

**Individual article page (`/articles/[slug]`):**

- Article body: 18px, max-width 640px, generous line-height (1.75)
- Reading time estimate at top (below title and date)
- Code blocks with GitHub syntax theme and copy button
- "Edit on GitHub →" link at bottom (links to the MDX file in the repo)
- Series navigation if part of a series: "← Previous: [title]" / "Next: [title] →" *(built now, used later)*
- No table of contents
- No share buttons
- No related articles
- No comments

**Draft preview:** Articles with `published: false` are hidden in production but visible in `next dev`. Use `process.env.NODE_ENV` check in the content loader.

**RSS Feed (`/rss.xml`):**

- Auto-generated from all published articles
- Full article content in feed items
- Valid RSS 2.0 / Atom format
- `<link rel="alternate" type="application/rss+xml">` in document `<head>`
- Articles only (not projects)

---

## 7. Page Specifications — Hire Section (`/hire/*`)

The `/hire` section shares the same codebase and global layout but uses a slightly adjusted tone. Design language stays minimal. Copy is more outcome-focused and professional but still casual — the visitor should feel like they'd enjoy working with you.

### 7.1 Services Overview — `/hire`

This is the primary landing page for freelance leads. It must rank for keywords like "hire freelance software developer", "custom software development", "freelance full-stack developer", "build SaaS MVP developer".

**Content:**

1. **Headline** — Outcome-focused, direct. Example: *"I build software that solves real problems."* Subline: *"From MVPs to production systems — for startups, businesses, and brands worldwide."* *(Final copy to be refined — should feel confident, not salesy.)*

2. **What I Build** — 5 service areas, each as a short paragraph (not cards, not icons):
   - **Custom Web Applications** — SaaS products, dashboards, internal tools. Emphasize outcomes: "ship your MVP without burning through your runway."
   - **Custom Business Applications** — Ordering systems, billing platforms, inventory management, CRMs, and any operational software a business needs to run. "Replace your spreadsheets with software that actually works for your workflow."
   - **MCP Servers & AI-Powered Solutions** — Custom Model Context Protocol servers, LLM integrations, intelligent automation, AI features for existing products. "Give your tools an AI layer, or build something new from scratch."
   - **Websites & Landing Pages** — Business sites, brand sites, personal sites. "Your digital presence, built to convert."
   - **API Integrations & Automation** — Connect systems, build connectors, automate workflows. "Stop copying data between tools. Let software do it."

3. **How I Work** — 4 steps in plain text (not a timeline, not cards):
   - Discovery — "We talk. You tell me what you need. I ask the right questions."
   - Samples & Proposal — "Before you commit, I build samples so you can see and feel what you're paying for. Then a clear scope, timeline, and price. No surprises."
   - Build — "Weekly updates, async-first communication. I ship fast."
   - Launch & Maintain — "Your product goes live. I stick around to make sure it keeps working — bug fixes, updates, support."

4. **Why Me** — Factual proof points in prose, not a bullet list. Weave in: built MCP servers for enterprise use cases, shipped 25+ production integrations, full-stack capability from database to deployment, timezone flexibility (IST with US/EU overlap), experience building for both startups and large organizations. Do NOT mention employer by name. Keep it conversational.

5. **CTA** — "Let's talk about your project →" linking to `/hire/book`. Repeated at top and bottom of the page.

6. **Cross-links** — Subtle references to `/projects`, `/articles`, and `/about` within the copy. These act as validation. Example: "See what I've built →" or "Read my writing →".

**SEO for this page:**

- Unique `<title>`: "Hire Tilak Dave — Freelance Software Developer | Custom Apps, MCP Servers, AI Solutions"
- Meta description targeting long-tail keywords
- JSON-LD `ProfessionalService` schema
- FAQ section at bottom (doubles as content and FAQ schema markup):
  - "What kind of software can you build?"
  - "How much does a custom web app cost?"
  - "Do you work with international clients?"
  - "What is your typical timeline?"
  - "How do we communicate during a project?"

### 7.2 Proof of Work — `/hire/work`

Selected projects presented with a client/business lens. Different framing from `/projects` — here the focus is problem → solution → result, not tech stack.

**Content:**

- 3–5 selected projects (can overlap with main projects page)
- Each project: what the client/user needed, what was built, what happened after launch
- Link to live project and code where applicable
- Testimonials section: **planned but hidden until available.** Build the component, wrap in a feature flag or conditional render.

### 7.3 Booking — `/hire/book`

**Content:**

- Brief heading: *"Book a free 30-minute discovery call"*
- One line: *"Pick a time that works for you. I'll come prepared with questions."*
- Embedded Cal.com widget (inline mode, full-width)
- Below embed: *"Prefer email? →"* link to `/hire/contact`

**Cal.com configuration:**

- Event type: 30-minute discovery call
- Custom booking questions: "What's your project about?", "What's your timeline?", "What's your approximate budget range?"
- 24-hour minimum notice
- 15-minute buffer between calls
- Automated email reminder workflow (Cal.com free tier)
- Theme: set explicitly to match site (light/dark based on system preference via JS detection passed to embed config)
- Branded color: `#B08A57`

**Technical note:** Use the latest `@calcom/embed-react` package. Verify React version compatibility at integration time — if the embed doesn't support the current React version, fall back to the vanilla JS embed (`@calcom/embed-core` script tag approach). Use `"use client"` directive on the embed component.

### 7.4 Contact — `/hire/contact`

**This is NOT a generic contact form.** It is designed to qualify freelance leads.

**Content:**

1. **Heading:** *"Tell me about your project"*
2. **Form fields:**
   - Name (text, required)
   - Email (text, required)
   - What do you need built? (textarea, required — prompt: "Describe your project in a few sentences. What problem are you solving?")
   - Budget range (dropdown, required): "Under $1,000" / "$1,000 – $5,000" / "$5,000 – $15,000" / "$15,000+" / "Not sure yet"
   - Timeline (dropdown, optional): "ASAP" / "1–2 months" / "3+ months" / "No rush, just exploring"
   - How did you find me? (text, optional)
3. **Submit button:** "Send Project Details"
4. **Below form:** *"I typically respond within 24 hours."*
5. **Alternative contact:** Direct links — Email (<hi@tiluckdave.in>), WhatsApp, LinkedIn, Twitter/X DM
6. **Informational notice:** "By submitting this form, you agree to our Privacy Policy." (linked)

**Technical:** Form submissions via Resend API to personal email. Honeypot spam field (hidden input) — no CAPTCHA. Rate limiting on the API route.

---

## 8. Global Elements

### 8.1 Navigation

**Main site nav:** Horizontal, top of page. Plain text links.

```
Tilak Dave          Projects    Articles    About    Hire me →
```

- "Tilak Dave" links to `/` (acts as logo — just text)
- "Hire me →" is the only accent-colored nav item, links to `/hire`
- Active page: `--text-primary` with underline. Inactive: `--text-secondary`, underline on hover.
- Mobile: same links, stacked vertically or in a simple slide-in. No hamburger icon — just show all links.

**Hire section nav:** Same position, adjusted links.

```
Tilak Dave          Services    Work    Book a Call    Contact
```

- "Tilak Dave" links to `/` (back to main site)
- Links specific to `/hire/*` routes
- "← Back to main site" subtle link somewhere (footer or nav)

### 8.2 Footer

Same across all pages. Minimal.

```
© 2026 Tilak Dave
GitHub · Twitter/X · LinkedIn · RSS
```

- Social links: GitHub, Twitter/X, LinkedIn — plain text, underlined
- RSS feed link
- No "Built with" credit
- On `/hire/*` pages, footer also includes link to Privacy Policy

### 8.3 Layout Widths

| Context | Max-width |
|---------|-----------|
| Article body | 640px |
| General page content | 640px |
| Navigation bar | 720px |
| OG images | 1200×630px |

Everything centered. No full-width sections. No edge-to-edge anything.

---

## 9. SEO Strategy

### 9.1 Technical SEO

- Server-side rendering / static generation for all pages
- Auto-generated `sitemap.xml` covering all pages, articles, projects, and /hire/* pages
- `robots.txt` allowing full crawl
- Canonical URLs on every page (critical: middleware must ensure `hire.tiluckdave.in/*` is NOT indexed — only `tiluckdave.in/hire/*`)
- Open Graph and Twitter Card meta tags on every page
- JSON-LD structured data:
  - `Person` schema on `/` and `/about`
  - `Article` schema on each article page
  - `ProfessionalService` schema on `/hire`
  - `FAQPage` schema on `/hire` (from the FAQ section)
  - `WebSite` schema with `SearchAction` on `/`
- Image optimization: `next/image` with WebP, proper alt text
- Core Web Vitals targets: LCP < 1.5s, FID < 50ms, CLS < 0.05 (system fonts + static generation makes this straightforward)
- Internal linking: articles reference projects, `/hire` links to projects and articles as validation

### 9.2 Content SEO

- Articles target keywords in your expertise areas: MCP development, API integrations, building SaaS, connector development, SDK development, automation
- Each article: clear target keyword in title, H1, and first paragraph
- Descriptive URLs: `/articles/how-to-build-mcp-server` not `/articles/post-42`
- Aim for 1,500+ word articles for competitive keywords
- Code snippets and practical examples in every technical article (attract backlinks)
- `/hire` targets long-tail commercial keywords: "hire freelance software developer", "custom SaaS MVP development", "freelance API integration developer", "hire MCP server developer", "custom business application developer"

### 9.3 Off-site SEO

- Submit sitemap to Google Search Console (fresh setup — old site link is stale) and Bing Webmaster Tools
- Cross-post articles to Dev.to and Hashnode with canonical URLs back to tiluckdave.in
- Medium: use "Import a Story" feature manually (API is deprecated)
- Social profiles (GitHub, Twitter/X, LinkedIn) all link to tiluckdave.in
- Engage in relevant communities with site linked in profiles

### 9.4 Cross-Posting Automation

GitHub Actions workflow triggered on push to `content/articles/`:

1. Detect new `.mdx` files via `git diff --name-only --diff-filter=A`
2. Parse frontmatter with `gray-matter`
3. Sanitize MDX → standard Markdown (strip imports/exports, replace custom components with "See original post" links, convert relative image paths to absolute URLs)
4. Post to Dev.to via REST API (`POST https://dev.to/api/articles`) with `canonical_url` set to `tiluckdave.in/articles/[slug]`
5. Post to Hashnode via GraphQL API (`https://gql.hashnode.com`, `publishPost` mutation) with `originalArticleURL`
6. Commit tracking JSON to prevent duplicate posts
7. 2–3 second delays between API calls

Articles publish on tiluckdave.in first. Cross-posting happens on next push (gives Google time to index the canonical first).

---

## 10. LLM Discoverability

### 10.1 `/llms.txt`

```markdown
# Tilak Dave — Software Engineer & Freelance Developer

> Software engineer specializing in API integrations, full-stack
> development, and AI-powered solutions. Available for freelance
> projects globally. Based in Hyderabad, India.

## About
- [About Tilak Dave](https://tiluckdave.in/about): Background,
  experience, and interests

## Services
- [Hire Tilak Dave](https://tiluckdave.in/hire): Custom web apps,
  SaaS MVPs, API integrations, AI-powered tools, business websites
- [Book a Call](https://tiluckdave.in/hire/book): Schedule a free
  30-minute discovery call

## Projects
- [All Projects](https://tiluckdave.in/projects): Selected work
  with live demos and source code

## Writing
- [Articles](https://tiluckdave.in/articles): Technical writing on
  MCP servers, API integrations, SDK development, and building software

## Contact
- Website: https://tiluckdave.in
- Email: hi@tiluckdave.in
- Booking: https://tiluckdave.in/hire/book

## Key Facts
- 25+ production integrations shipped
- Built MCP servers for enterprise use cases
- Full-stack: React, Next.js, Node.js, TypeScript, Firebase, PostgreSQL
- Specialties: MCP servers, API integrations, SDK/connector development, custom business applications
- Available for freelance projects worldwide
```

### 10.2 Structured Data for AI

- Rich JSON-LD on every page (as specified in Section 9.1)
- All content as crawlable HTML text (not hidden in JS bundles — SSR/SSG handles this)
- FAQ schema on `/hire` with clear, declarative answers
- Consistent name-to-skill associations across site, GitHub, LinkedIn, Twitter

**Reality check:** No major AI provider has confirmed using `llms.txt` during inference. Implementation takes 30 minutes and has zero downside. Primary immediate value: users manually feeding it to AI assistants, IDE tools loading it as context, and early-mover positioning.

---

## 11. Privacy Policy — `/privacy`

**Required because:** Contact form collects personal data (name, email). Targeting global clients means GDPR awareness. Vercel Analytics is cookieless so no consent banner is needed.

**Structure (~600 words):**

1. **Data controller** — Tilak Dave, <hi@tiluckdave.in>
2. **Data collected** — Contact form: name, email, project description, budget range, timeline, referral source. Analytics: anonymous page views, referrer, device type, city-level geolocation (Vercel Analytics — no cookies, no persistent identifiers, IP not stored).
3. **Purpose** — Responding to project inquiries; understanding site traffic.
4. **Legal basis** — Legitimate interest for analytics (GDPR Art. 6(1)(f)); legitimate interest for contact form (inquiry response).
5. **Data sharing** — Vercel (hosting, analytics), Resend (email delivery). No data sold.
6. **Retention** — Contact form data: 12 months, then deleted. Analytics: session data discarded within 24 hours by Vercel.
7. **Cookies** — "This site does not use cookies."
8. **Your rights** — GDPR rights (access, erasure, portability, objection) for EU visitors.
9. **International transfers** — Data processed in India and US (Vercel infrastructure).
10. **Security** — HTTPS/TLS.
11. **Contact** — <hi@tiluckdave.in> for privacy requests.
12. **Updates** — Last updated date. Changes posted to this page.

**Form notice:** Below the contact form submit button: "By submitting this form, you agree to our [Privacy Policy](/privacy)."

---

## 12. Development Sequence

Ordered by dependency. Each item builds on the previous.

```
 1. Project scaffolding
    - Next.js (latest) + App Router + Tailwind CSS (latest) + TypeScript
    - Git repo setup, Vercel project connection
    - Domain configuration: tiluckdave.in, www redirect, hire subdomain redirect
    - Middleware for hire.tiluckdave.in → /hire 301 redirect
    - CSS custom properties: full color palette (light + dark), font stacks, spacing tokens
    - Base layout component: centered column, nav, footer

 2. Content pipeline
    - MDX processing setup (gray-matter, next-mdx-remote or similar)
    - Content directory structure: content/articles/, content/projects/
    - Frontmatter schemas for articles and projects
    - Content loader utilities: getAllArticles(), getArticleBySlug(),
      getAllProjects() — with published/draft filtering
    - Reading time calculation utility
    - Code block component with GitHub syntax theme + copy button

 3. Core pages — main site
    - Home page: name, description, 3 projects, 3 articles, hire CTA
    - Projects listing page
    - Articles listing page
    - Individual article page: body, reading time, date, edit-on-GitHub link,
      series navigation (built but unused until series exist)
    - About page: bio, photo, experience, now section, fun stuff, support links

 4. Dynamic OG images
    - Shared OG image template (Satori/next-og)
    - Inter Bold TTF font bundled for Satori
    - opengraph-image.tsx for: home, about, projects, articles listing
    - opengraph-image.tsx for: /articles/[slug] (reads title from MDX)
    - opengraph-image.tsx for: /projects (if needed)
    - Different labels: "Article" vs "Project" on respective images

 5. SEO foundation
    - sitemap.xml auto-generation (all pages, articles, projects, /hire/*)
    - robots.txt
    - Canonical URLs on all pages
    - JSON-LD: Person, Article, WebSite schemas
    - Open Graph + Twitter Card meta on all pages
    - RSS feed generation (/rss.xml) + <link rel="alternate"> in <head>

 6. Hire section
    - /hire layout (adjusted nav, shared design language)
    - /hire — services overview page with full copy
    - /hire/work — proof of work page, selected projects in client lens
    - /hire/book — Cal.com account setup, event type config, embed integration
    - /hire/contact — freelance-focused form, Resend integration, honeypot spam protection
    - JSON-LD: ProfessionalService, FAQPage schemas on /hire
    - WhatsApp contact link

 7. Privacy & legal
    - /privacy page
    - Form notice linking to privacy policy
    - Footer link to privacy policy

 8. LLM & discovery
    - /llms.txt static file
    - Google Search Console setup + sitemap submission
    - Bing Webmaster Tools setup
    - Vercel Analytics activation

 9. Cross-posting automation
    - Dev.to API integration in GitHub Actions
    - Hashnode GraphQL API integration in GitHub Actions
    - MDX → Markdown sanitizer (strip imports, absolutize images)
    - Tracking JSON to prevent duplicate posts
    - Workflow trigger: push to content/articles/

10. Launch checklist
    - Lighthouse audit: target 95+ performance
    - Core Web Vitals check: LCP < 1.5s, CLS < 0.05
    - Test OG images: Twitter Card Validator, Facebook Debugger
    - Test RSS feed in a reader
    - Test Cal.com booking flow end-to-end
    - Test contact form submission → email delivery
    - Test hire.tiluckdave.in redirect
    - Test www.tiluckdave.in redirect
    - Verify sitemap in Search Console
    - Verify all canonical URLs resolve correctly
    - Write 1 seed article and 3 project entries
    - Deploy
```

---

## 13. Success Metrics (1 month post-launch)

| Metric | Target |
|--------|--------|
| All pages indexed by Google | Yes |
| Lighthouse performance score | 95+ |
| Core Web Vitals — all green | Yes |
| Articles published | 2+ |
| Projects listed | 3 |
| Organic search impressions (any) | 100+ |
| /hire page visits | 30+ |
| Contact form submissions or call bookings | 1+ |
| RSS feed has subscribers | 1+ |
| Cross-posting pipeline functional | Yes |
| Site loads in < 1.5s (LCP) | Yes |

---

## 14. Explicitly Out of Scope

- Blog comments
- Newsletter / email subscription
- CMS or admin dashboard
- Animations beyond link hover states
- Multi-language support
- E-commerce or payments
- User accounts or authentication
- Uses/setup page
- Spotify or GitHub widgets
- Command palette (⌘K)
- Guestbook
- View counts on articles
- Reactions/likes on articles
- Cookie consent banner (not needed — Vercel Analytics is cookieless)
- Dark/light mode toggle (system preference only)
- Cards, shadows, bordered containers
- Decorative images, gradients, background patterns
- Changelog page on site (maintained as CHANGELOG.md in repo)

---

## 15. Reference Sites

- **rauchg.com** — The archetype. Blog-forward, typography-only, single column.
- **leerob.com** — Next.js portfolio + blog done right. Uses View Transitions.
- **paco.me** — Beautiful minimal design. Dark default.
- **brianlovin.com** — Clean developer portfolio, "personal OS" approach.

---

*End of PRD v2.0*

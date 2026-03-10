# CLAUDE.md — tiluckdave.in

You are building a personal portfolio and freelance website for Tilak Dave.
The complete specification lives in `PRD.md` at the project root. That document is the SINGLE SOURCE OF TRUTH. If this file and PRD.md ever conflict, PRD.md wins.

Read PRD.md in full before writing any code. Re-read the relevant PRD section before starting each development step.

---

## HARD RULES — NEVER VIOLATE THESE

1. **No cards EXCEPT: service blocks on /hire, MDX `<LinkPreview>` component, and the hire CTA section on the home page.** On main site pages (home, about, projects, articles), content sits directly on the page surface — no elevated containers, no shadows. Service cards on /hire use `.service-card` class with `--bg-secondary` background, `1px border`, and `border-radius: 0.5rem`. The home page hire CTA section is a soft `--bg-secondary` box with border. These are the only three card exceptions.

2. **No decorative images.** The only images on the entire site are: one photo on /about, dynamically generated OG images (text-only PNGs via next/og), and images within article MDX content. No hero images, no background images, no icons, no SVG decorations, no illustrations.

3. **Subtle fade-in and stagger animations are used globally.** `.stagger-children` applies sequential `fadeSlideUp` to list items. `.animate-in` fades a single element. `.hover-lift` applies to service cards and project images. Nav and footer NEVER animate. `prefers-reduced-motion` must be respected — all animations have a reduced-motion fallback in globals.css.

4. **No bold colors.** The accent color is hunter green (#2C5F4B light, #4A9B7F dark). It appears ONLY on links, the "Hire me" nav item, and active nav indicators. Nowhere else. No colored backgrounds, no colored badges, no colored tags. Subtle gradients (`--gradient-hero`, `--gradient-section`, `--gradient-glow`) are allowed ONLY on /hire pages, not on main site pages.

5. **680px max-width for ALL content including nav and footer.** One value: `--max-width: 680px`. Nav, footer, and every page content wrapper all use this. No element except background gradients and noise texture extends beyond 680px of content. No sidebars, no multi-column layouts. The ONLY grid is `.services-grid` on the /hire page. Cal.com embed can be full-width within its container.

6. **System fonts only.** Zero external font requests. Use the exact font stacks from PRD section 4.3. Do NOT install or import any font packages (no `next/font`, no Google Fonts, no Geist, no Inter for the site — Inter Bold TTF is only bundled for Satori OG image generation).

7. **Links are always underlined.** Every link on the site has `text-decoration: underline` in its default state. No exceptions. No "hover to reveal underline" patterns. Hover changes `text-decoration-thickness` from 1px to 2px and reduces opacity to 0.8 — not font-weight, not color.

8. **No UI component libraries.** No shadcn, no Radix, no Headless UI, no Material UI, no Chakra. Build all components from scratch with Tailwind utility classes. The site is simple enough that component libraries add unnecessary complexity.

9. **No buttons that look like buttons.** CTAs are text links, styled the same as other links (underlined, accent-colored). The only element that resembles a button is the contact form submit, which should be minimal — no rounded corners, no shadows, no gradients. Simple solid background with text.

10. **No hamburger menus.** Mobile navigation shows all links stacked vertically or in a simple layout. No toggle, no slide-in panel, no overlay.

11. **No tooltips, modals, dropdowns, carousels, or sliders.** Accordions are allowed ONLY for the FAQ section on `/hire` page (see `faq-list.tsx`). Code tabs are allowed inside MDX content only (see `code-tabs.tsx`). No other interactive disclosure patterns anywhere on the site.

12. **Dark mode follows system preference only.** Use `prefers-color-scheme` media query in CSS/Tailwind. No toggle switch. No mode selector. No JavaScript theme switching. If the user's OS is dark, the site is dark. Period.

13. **No localStorage or sessionStorage.** Theme preference comes from the OS. No user preferences are stored client-side.

14. **Every page must be statically generated or server-rendered.** No client-side-only pages. No loading spinners for content. The only `"use client"` components allowed are: Cal.com embed wrapper, contact form, and code block copy button.

15. **Follow the PRD exactly.** If the PRD says a page has specific content in a specific order, build exactly that. Do not add sections, features, or UI elements that are not in the PRD. Do not add "nice to have" improvements. If it's in the "Explicitly Out of Scope" section (PRD section 14), do not build it under any circumstances.

16. **All hardcoded values must come from `src/lib/config.ts`.** Never hardcode URLs, email addresses, social links, Cal.com config, support links, or domain names directly in components. If it's a site-wide constant, it belongs in `siteConfig`. This makes global updates trivial and prevents stale values scattered across the codebase.

17. **Code blocks must have syntax highlighting.** All code blocks in MDX content MUST be highlighted via `rehype-pretty-code` with `github-light` (light mode) and `github-dark` (dark mode) themes. Code blocks without highlighting are a bug. The language identifier on the opening fence (e.g., ` ```ts `) is required for highlighting to work.

18. **Project images are always 16:9 aspect ratio, full content width, rounded-lg, with 1px border.** This applies on the home page, /projects listing, and /hire/work. Use `aspect-ratio: 16/9`, `border-radius: 0.5rem`, `border: 1px solid var(--border)`, `overflow: hidden`. Gray placeholder with project name in `--font-mono` when no image.

19. **Every page has a noise texture overlay and ambient gradient glow behind content.** These are the ONLY full-viewport elements. `.noise-bg` is on the root `<body>`. `.ambient-glow` div is in each layout. Hire layouts use `.ambient-glow--hire` for a stronger glow. These are cosmetic only and never affect layout.

20. **`prefers-reduced-motion` must be respected.** All CSS animations have a fallback block inside `@media (prefers-reduced-motion: reduce)` that sets `animation: none`, `opacity: 1`, and `transform: none`. Never skip this.

---

## TECH STACK — USE EXACTLY THESE

- **Next.js** (latest stable) with App Router
- **Tailwind CSS** (latest stable)
- **TypeScript** (strict mode)
- **MDX** processing: `gray-matter` for frontmatter, `next-mdx-remote` (or `@next/mdx`) for rendering
- **next/og** (`ImageResponse`) for dynamic OG images
- **@calcom/embed-react** (latest) — if incompatible with current React version, fall back to `@calcom/embed-core` vanilla JS
- **Resend** SDK for contact form email delivery
- **rehype-pretty-code** with `github-light` and `github-dark` themes for code syntax highlighting
- Package manager: **pnpm**

Do NOT install any package not listed above unless absolutely required for MDX processing or RSS generation. If you think a package is needed, state why before installing.

---

## PROJECT STRUCTURE

```
tiluckdave.in/
├── CLAUDE.md
├── PRD.md
├── CHANGELOG.md
├── content/
│   ├── articles/          # MDX files for blog posts
│   │   └── example.mdx
│   └── projects/          # MDX files for project entries
│       └── example.mdx
├── public/
│   ├── robots.txt
│   ├── llms.txt
│   └── images/            # About page photo, article images
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout: fonts, metadata, analytics
│   │   ├── page.tsx                # Home
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── articles/
│   │   │   ├── page.tsx            # Articles listing
│   │   │   └── [slug]/
│   │   │       ├── page.tsx        # Individual article
│   │   │       └── opengraph-image.tsx
│   │   ├── hire/
│   │   │   ├── layout.tsx          # Hire section layout (adjusted nav)
│   │   │   ├── page.tsx            # Services overview
│   │   │   ├── work/
│   │   │   │   └── page.tsx        # Proof of work
│   │   │   ├── book/
│   │   │   │   └── page.tsx        # Cal.com booking
│   │   │   └── contact/
│   │   │       └── page.tsx        # Freelance contact form
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   ├── rss.xml/
│   │   │   └── route.ts            # RSS feed generation
│   │   ├── sitemap.ts              # Dynamic sitemap
│   │   └── opengraph-image.tsx     # Default OG image
│   ├── components/
│   │   ├── nav.tsx                 # Main site navigation
│   │   ├── hire-nav.tsx            # Hire section navigation
│   │   ├── footer.tsx
│   │   ├── mdx-components.tsx      # Custom MDX component overrides
│   │   ├── code-block.tsx          # Code block with copy button ("use client")
│   │   ├── cal-embed.tsx           # Cal.com embed wrapper ("use client")
│   │   └── contact-form.tsx        # Contact form ("use client")
│   ├── lib/
│   │   ├── content.ts              # MDX loading utilities
│   │   ├── reading-time.ts         # Reading time calculation
│   │   └── og-utils.ts             # Shared OG image template
│   └── styles/
│       └── globals.css             # Tailwind imports + CSS custom properties
├── .github/
│   └── workflows/
│       └── cross-post.yml          # Cross-posting GitHub Action
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── middleware.ts                    # hire.tiluckdave.in → /hire redirect
└── package.json
```

Do NOT create files or directories outside this structure without stating why.

---

## DEVELOPMENT SEQUENCE

Build the project in this exact order. Complete each step fully before moving to the next. Each step description references the PRD section to follow.

### Step 1: Project Scaffolding

**PRD refs:** Section 2 (Domain), Section 3 (Tech Stack), Section 4 (Design Language), Section 8.1-8.3 (Global Elements)

- Initialize Next.js with App Router, TypeScript, Tailwind, pnpm
- Configure `tailwind.config.ts` with the EXACT color tokens from PRD section 4.2 (both light and dark mode palettes), font stacks from section 4.3, and max-width values
- Set up `globals.css` with CSS custom properties for all design tokens, `prefers-color-scheme` media query for dark mode, base typography styles, and link styles (always underlined, accent color, hover weight change)
- Create `middleware.ts` for `hire.tiluckdave.in` → `tiluckdave.in/hire` 301 redirect and `www.tiluckdave.in` → `tiluckdave.in` redirect
- Build root `layout.tsx` with metadata defaults, system font application, and the base centered-column layout
- Build `nav.tsx` exactly matching PRD section 8.1 main site nav layout
- Build `footer.tsx` exactly matching PRD section 8.2
- Create placeholder `page.tsx` for home that just renders "Tilak Dave" in H1 to verify the layout works
- Verify: dark mode switches with OS preference, fonts are system fonts with zero network requests, layout is single column centered at 640px, links are underlined with accent color

### Step 2: Content Pipeline

**PRD refs:** Section 6.3 (Projects schema), Section 6.4 (Articles schema), Section 4.4 (Code blocks)

- Set up `content/articles/` and `content/projects/` directories
- Create `src/lib/content.ts` with: `getAllArticles()`, `getArticleBySlug()`, `getAllProjects()` — reads MDX files, parses frontmatter with `gray-matter`, sorts by date, filters by `published` field (articles only)
- Implement reading time calculation in `src/lib/reading-time.ts`
- Set up MDX rendering with `next-mdx-remote` (or `@next/mdx`)
- Configure `rehype-pretty-code` with `github-light` and `github-dark` themes (theme switches with `prefers-color-scheme`)
- Build `code-block.tsx` client component: copy button appears on hover (top-right), copies code to clipboard
- Build `mdx-components.tsx` with custom component overrides — ensure all rendered HTML follows the design language (no accidental cards, no borders on blockquotes, etc.)
- Create 1 example article MDX and 1 example project MDX with full frontmatter matching PRD schemas
- Verify: MDX renders correctly, code blocks have syntax highlighting + copy button, reading time calculates, draft articles are hidden in production but visible in dev

### Step 3: Core Pages — Main Site

**PRD refs:** Section 6.1 (Home), Section 6.2 (About), Section 6.3 (Projects), Section 6.4 (Articles)

- Build home page (`/`) matching PRD section 6.1 EXACTLY: H1 name, 2-line description placeholder, 3 selected projects as text rows, 3 recent articles as text rows, hire CTA text link at bottom
- Build projects page (`/projects`): flat list, each row is project name (linked) + description + "Live ↗" and "Code ↗" links. Featured projects first, then by date
- Build articles listing page (`/articles`): chronological list, each row is title (linked) + date
- Build individual article page (`/articles/[slug]`): title, date, reading time, MDX body at 18px, "Edit on GitHub →" link at bottom, series navigation component (built but conditionally rendered only when series frontmatter exists)
- Build about page (`/about`): bio placeholder, photo placeholder (use a gray box until real photo is added), experience section placeholder, "Now" section placeholder, fun stuff placeholder, support links (Buy Me a Coffee, GitHub Sponsors, PayPal — as plain underlined text links)
- Verify: every page is single column 640px, no cards anywhere, no decorative elements, all links underlined, correct typography scale from PRD section 4.3

### Step 4: Dynamic OG Images

**PRD refs:** Section 4.5 (OG Images)

- Download and place Inter Bold TTF in the project (for Satori — this is the ONLY external font file, used exclusively for OG image generation, NOT for the site itself)
- Create shared OG template utility in `src/lib/og-utils.ts`: 1200x630, #111111 background, warm off-white text, label top-left, domain bottom-right
- Create `opengraph-image.tsx` for: root (home), about, projects listing, articles listing
- Create `opengraph-image.tsx` in `[slug]` route: reads article title from MDX frontmatter, label says "Article"
- Different labels on images: "Article" vs "Project" vs page name
- Verify: OG images generate correctly at build time, text renders in Inter Bold, no gradients or decorations

### Step 5: SEO Foundation

**PRD refs:** Section 9 (SEO Strategy)

- Create `sitemap.ts` that dynamically generates sitemap covering all pages, articles, projects, and /hire/* routes
- Create `public/robots.txt` allowing full crawl
- Add canonical URLs to all pages — critical: ensure `hire.tiluckdave.in/*` URLs are NOT indexable (middleware redirect handles this, but verify with `<link rel="canonical">` pointing to `tiluckdave.in/hire/*`)
- Add JSON-LD structured data: `Person` schema on `/` and `/about`, `Article` schema on each article, `WebSite` schema with `SearchAction` on `/`
- Add Open Graph + Twitter Card meta tags to all pages via Next.js metadata API
- Create RSS feed route at `/rss.xml/route.ts`: generates valid RSS 2.0 from all published articles with full content, add `<link rel="alternate" type="application/rss+xml">` to root layout `<head>`
- Verify: validate sitemap XML, validate RSS feed in a reader, check JSON-LD with Google's Rich Results Test, verify OG tags with Twitter Card Validator format

### Step 6: Hire Section

**PRD refs:** Section 7 (all subsections), Section 8.1 (Hire nav)

- Create `/hire/layout.tsx` with adjusted navigation matching PRD section 8.1 hire nav: "Tilak Dave" (links to /), Services, Work, Book a Call, Contact
- Build `/hire/page.tsx` (services overview) matching PRD section 7.1 EXACTLY: headline, 5 service areas as paragraphs, how I work (4 steps as prose), why me (prose), CTA links top and bottom, FAQ section at bottom
- Build `/hire/work/page.tsx` matching PRD section 7.2: selected projects in problem→solution→result format, testimonials section built but hidden (conditional render, empty state)
- Build `/hire/book/page.tsx` matching PRD section 7.3: heading, one-line description, Cal.com inline embed, "Prefer email?" link to /hire/contact. Create `cal-embed.tsx` as "use client" component
- Build `/hire/contact/page.tsx` matching PRD section 7.4 EXACTLY: "Tell me about your project" heading, form with exact fields specified (name, email, project description textarea, budget dropdown, timeline dropdown, referral source), submit button, response time note, alternative contact links (email, WhatsApp, LinkedIn, Twitter/X). Create `contact-form.tsx` as "use client" component
- Create API route for contact form: validate inputs, honeypot check, rate limiting, send via Resend to personal email
- Add JSON-LD: `ProfessionalService` schema on `/hire`, `FAQPage` schema from the FAQ section
- Add hire-specific SEO metadata with title and description from PRD section 7.1
- Verify: hire nav is different from main nav, all pages follow single-column layout, no cards, form works end-to-end, Cal.com embed loads

### Step 7: Privacy & Legal

**PRD refs:** Section 11 (Privacy Policy)

- Build `/privacy/page.tsx` with the exact structure from PRD section 11 (12 points)
- Add "By submitting this form, you agree to our Privacy Policy" notice below contact form submit button (link to /privacy)
- Add Privacy Policy link to footer on /hire/* pages
- Verify: privacy page renders, form notice is present, footer link works

### Step 8: LLM & Discovery

**PRD refs:** Section 10 (LLM Discoverability)

- Create `public/llms.txt` with exact content from PRD section 10.1
- Set up Google Search Console verification (add verification meta tag or DNS record — leave instructions in CHANGELOG.md for manual completion)
- Set up Bing Webmaster Tools verification (same — leave instructions)
- Add Vercel Analytics: `@vercel/analytics` package, add `<Analytics />` component to root layout
- Verify: /llms.txt is accessible, analytics script loads

### Step 9: Cross-Posting Automation

**PRD refs:** Section 9.4 (Cross-Posting Automation)

- Create `.github/workflows/cross-post.yml` matching PRD section 9.4 specification
- Trigger on push to `content/articles/`
- Detect new MDX files via git diff
- MDX → Markdown sanitizer: strip imports/exports, replace custom components, absolutize image paths
- Dev.to API integration with canonical URL
- Hashnode GraphQL API integration with originalArticleURL
- Tracking JSON file to prevent duplicates
- Add required secrets to workflow: `DEVTO_API_KEY`, `HASHNODE_TOKEN`, `HASHNODE_PUBLICATION_ID`
- Verify: workflow YAML is valid, sanitizer handles edge cases

### Step 10: Launch Checklist

**PRD refs:** Section 13 (Success Metrics)

Run these checks and fix any issues:

- Lighthouse audit on all pages: target 95+ performance
- Core Web Vitals: LCP < 1.5s, CLS < 0.05
- Test OG images render correctly for every page type
- Test RSS feed validates and renders in a feed reader
- Test Cal.com booking flow: page loads → select time → book → confirmation
- Test contact form: submit → email arrives → honeypot blocks spam
- Test hire.tiluckdave.in → tiluckdave.in/hire redirect (301)
- Test <www.tiluckdave.in> → tiluckdave.in redirect (301)
- Verify sitemap.xml includes all pages
- Verify all canonical URLs resolve correctly
- Verify no page has cards, shadows, gradients, decorative images, or animations
- Verify every link on the site is underlined
- Verify dark mode works from system preference on every page
- Create 3 real project MDX entries (Tilak provides content)
- Create 1 real article MDX entry (Tilak provides content)
- Deploy to Vercel

---

## WHEN YOU'RE UNSURE

1. Re-read the relevant PRD section
2. If the PRD doesn't specify something, choose the SIMPLER option
3. If two approaches exist, choose the one with fewer dependencies
4. If you want to add something not in the PRD, DON'T — ask first
5. If a package has compatibility issues, try the vanilla/simpler alternative before adding workarounds

## CODE STYLE

- TypeScript strict mode, no `any` types
- Prefer `const` over `let`, never use `var`
- Prefer named exports over default exports (exception: Next.js page/layout conventions which require default exports)
- Use Tailwind utility classes. No inline styles except in OG image generation (Satori requires inline styles)
- Keep components small. If a component exceeds 100 lines, split it
- No comments explaining obvious code. Comments only for non-obvious decisions referencing PRD sections
- All content placeholder text should be wrapped in a comment like `{/* TILAK: Replace with your bio */}` so it's easy to find and replace

## COMMIT MESSAGES

Use conventional commits:

- `feat: add articles listing page`
- `fix: correct dark mode accent color`
- `chore: configure tailwind design tokens`
- `content: add example article mdx`

Commit after each meaningful unit of work within a step, not just at the end of a step.

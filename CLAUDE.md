# CLAUDE.md — tiluckdave.in

Personal website, technical portfolio, and digital garden for **Tilak Dave** (`tiluckdave.in`).

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Styling**: Vanilla CSS (`src/styles/globals.css`) with CSS custom properties and dark/light mode tokens
- **Content / MDX**: MDX with `next-mdx-remote/rsc`, `gray-matter`, `rehype-pretty-code`, `remark-gfm`, `shiki`
- **Game Embed**: Godot 4 WebAssembly export (`/public/games/roadrash/`) embedded directly via `RoadRash` component
- **Media & Fonts**: Local web fonts (Newsreader / Instrument Serif, Inter / Sans, Mono) & Next.js Image / video streaming
- **Package Manager**: `pnpm` (strict package management)

---

## 📂 Project Structure

```
tiluckdave-in/
├── content/
│   ├── bio-default.mdx         # Short / default bio narrative
│   ├── bio-long.mdx            # Detailed long-form narrative with interactive components
│   ├── blogs/                  # Long-form technical articles (e.g. workato.mdx)
│   ├── notes/                  # Concise notes and reflections (e.g. beliefs.mdx)
│   └── projects/               # Project case studies (e.g. hound-mcp.mdx, dinecard.mdx)
├── public/
│   ├── fonts/                  # Custom serif, sans, and monospace webfonts
│   ├── games/roadrash/         # Standalone Godot 4 HTML5/WASM runtime files
│   ├── images/
│   │   ├── articles/           # Editorial images used across figures and MDX
│   │   ├── home-poster.jpg     # Desktop sidebar poster
│   │   └── home-animation.mp4  # Desktop sidebar hover animation
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-image.png
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fonts, global CSS, meta tags, schema JSON-LD
│   │   ├── page.tsx            # Homepage: interactive bio, contact links, notes, blogs, projects
│   │   ├── (main)/
│   │   │   ├── layout.tsx      # Subpage shell with back navigation link
│   │   │   └── [slug]/page.tsx # Universal SSG router for notes, blogs, and projects
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── rss.xml/route.ts    # Dynamic RSS 2.0 feed
│   │   └── sitemap.ts          # Automated XML sitemap
│   ├── components/
│   │   ├── bio-toggle.tsx      # Short / Long bio tab switcher
│   │   ├── collapsible.tsx     # Full-width minimalist disclosure component (▶ / ▼)
│   │   ├── road-rash.tsx       # Road Rash Godot game embed with start overlay & controls
│   │   ├── figure.tsx          # 1px border figure with auto-ratio & fullscreen lightbox gallery
│   │   ├── figure-grid.tsx     # Multi-image grid with column ratios (ratio="2:3", "3:2", etc.)
│   │   ├── by-line.tsx         # Author avatar and article metadata header
│   │   ├── project-links.tsx   # Action buttons for live demo and repository links
│   │   └── hover-video.tsx     # Desktop right-column interactive video card
│   ├── lib/
│   │   ├── config.ts           # Central site configuration (socials, URLs, SEO)
│   │   ├── mdx.ts              # Frontmatter parser and content query helpers
│   │   └── mdx-components.tsx  # Central registry for components available in MDX
│   └── styles/
│       └── globals.css         # Complete design system, typographic scale & component styles
├── package.json
└── tsconfig.json
```

---

## 🎨 Design Philosophy & Rules

1. **Editorial & Timeless Typography**:
   - Primary headings and titles use custom serif typography (`--font-serif`).
   - Body copy uses clean, legible sans typography (`--font-site` / `--font-sans`).
   - Code and metadata tags use crisp monospace font (`--font-mono`).
2. **Subtle & Restrained Aesthetic**:
   - Content sits directly on the canvas surface.
   - Minimalist 1px borders (`var(--border)`) without harsh drop shadows.
   - Micro-interactions: subtle vertical rise on figure hover (`translateY(-3px)`), gentle link underline hover shifts.
3. **Responsive Two-Column Layout on Desktop**:
   - **Desktop (>= 1100px)**: Left column houses scrollable content (max-width: 600px); right column features a sticky artwork/video unit.
   - **Mobile (< 1100px)**: Cleanly collapses to a centered single-column layout.
4. **Dark & Light Mode Harmony**:
   - Follows OS `prefers-color-scheme` automatically with curated HSL color tokens.
5. **No Ad-Hoc Component Replacements**:
   - MDX components are registered centrally in `src/lib/mdx-components.tsx` and referenced directly in MDX documents (e.g. `<FigureGrid>`, `<Figure>`, `<Collapsible>`, `<RoadRash />`).

---

## 🧩 Key MDX Components

### `<Collapsible>`
Full-width interactive disclosure element:
```mdx
<Collapsible title="Play RoadRash">
  <RoadRash />
</Collapsible>
```

### `<RoadRash>`
Direct embed of the customized Road Rash arcade game with:
- Centered **Start Game** launch overlay.
- Minimalist controls bar (`Arrows`, `C` punch, `X` kick).
- **Restart** and **Fullscreen / Exit Fullscreen** actions with SVG icons.
- Small developer attribution credit.

### `<Figure>`
High-resolution figure with 1px border, configurable width maintaining aspect ratio, and click-to-expand fullscreen lightbox:
```mdx
<Figure
  src="/images/articles/laptop.png"
  alt="The old laptop"
  caption="The old Samsung laptop"
  width="300px"
/>
```

### `<FigureGrid>` / `<FigureGroup>`
Side-by-side multi-image grid with custom column ratios and responsive mobile stacking:
```mdx
<FigureGrid ratio="2:3" align="center">
  <Figure src="/images/articles/with_my_dog.png" alt="With Bela" caption="Me and my dog, Bela" />
  <Figure src="/images/articles/friends.png" alt="School friends" caption="School friends" />
</FigureGrid>
```

### `<ProjectLinks>` & `<ProjectLink>`
```mdx
<ProjectLinks>
  <ProjectLink href="https://example.com" label="Live App" />
  <ProjectLink href="https://github.com/tiluckdave/..." label="GitHub" />
</ProjectLinks>
```

---



## 🚀 Development & Build Commands

- **Development server**: `pnpm run dev` (starts on `http://localhost:3000`)
- **Production build**: `pnpm run build` (Turbopack + SSG static site generation)
- **Start production server**: `pnpm start`
- **Lint / Typecheck**: TypeScript strict checks run automatically on `pnpm run build`

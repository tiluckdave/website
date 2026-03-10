import fs from "fs";
import path from "path";

// PRD Section 4.5 — OG image shared template
// 1200x630, dark background, Inter Bold, text-only

export function getInterBoldFont(): Buffer {
  const fontPath = path.join(process.cwd(), "public/fonts/InterBold.ttf");
  return fs.readFileSync(fontPath);
}

export interface OGImageConfig {
  title: string;
  label?: string;
  date?: string;
}

// Shared OG image JSX config — used in ImageResponse
export function buildOGConfig(config: OGImageConfig) {
  return {
    width: 1200,
    height: 630,
    title: config.title,
    label: config.label,
    date: config.date,
  };
}

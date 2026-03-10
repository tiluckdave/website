import fs from "fs";
import path from "path";

export function getInterBoldFont(): Buffer {
  const fontPath = path.join(process.cwd(), "public/fonts/InterBold.ttf");
  return fs.readFileSync(fontPath);
}

export interface OGImageConfig {
  title: string;
  label?: string;
  date?: string;
}

export function buildOGConfig(config: OGImageConfig) {
  return {
    width: 1200,
    height: 630,
    title: config.title,
    label: config.label,
    date: config.date,
  };
}

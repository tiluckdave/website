/**
 * Usage:
 *   node scripts/generate-project-image.mjs <screenshot> <output> <url>
 *
 * Example:
 *   node scripts/generate-project-image.mjs ~/Desktop/dinecard.png public/images/projects/dinecard.png dinecard.in
 *
 * Output: 1200x400 PNG (3:1 ratio)
 * Browser frame fits the screenshot height. Empty bg on both sides.
 */

import sharp from "sharp";
import path from "path";

const WIDTH = 1200;
const HEIGHT = 400;

const CHROME_H = 36;
const BG_PADDING = 24;
const BLEED = 80;
const TOP_PADDING = 30;
const CORNER_RADIUS = 10;

const CHROME_BG = "#1E1E1E";
const DOT_RED = "#FF5F57";
const DOT_YELLOW = "#FFBD2E";
const DOT_GREEN = "#28C840";
const URL_BAR_BG = "#2A2A2A";
const URL_TEXT = "#8A8478";
const ACCENT = "#5B9A7B";

const [, , inputArg, outputArg, urlArg] = process.argv;

if (!inputArg || !outputArg) {
  console.error("Usage: node scripts/generate-project-image.mjs <screenshot> <output> <url>");
  process.exit(1);
}

const inputPath = path.resolve(inputArg);
const outputPath = path.resolve(outputArg);
const displayUrl = urlArg ?? "tiluckdave.in";

const { width: origW, height: origH } = await sharp(inputPath).metadata();

const screenH = HEIGHT - TOP_PADDING - BG_PADDING - CHROME_H + BLEED;
const scale = screenH / origH;
const screenW = Math.round(origW * scale);

const screenshot = await sharp(inputPath)
  .resize(screenW, screenH, { fit: "fill" })
  .png()
  .toBuffer();

const frameW = screenW + 2;
const frameH = screenH + CHROME_H + 1;
const frameX = Math.round((WIDTH - frameW) / 2);
const frameY = TOP_PADDING;

const screenshotLeft = frameX + 1;
const screenshotTop = frameY + CHROME_H;

const urlBarX = 88;
const urlBarY = 8;
const urlBarW = frameW - 88 - 16;
const urlBarH = 20;

// Seeded LCG for deterministic noise
let seed = 0x9e3779b9;
function rand() {
  seed = (seed ^ (seed << 13)) >>> 0;
  seed = (seed ^ (seed >> 7)) >>> 0;
  seed = (seed ^ (seed << 17)) >>> 0;
  return (seed >>> 0) / 0xffffffff;
}

const noisePixels = Array.from({ length: 2400 }, () => {
  const x = Math.floor(rand() * WIDTH);
  const y = Math.floor(rand() * HEIGHT);
  const op = (0.04 + rand() * 0.18).toFixed(2);
  const r = Math.floor(rand() * 1.5);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${ACCENT}" opacity="${op}"/>`;
}).join("");

const svg = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#0D1F18"/>
      <stop offset="50%" stop-color="#0D1410"/>
      <stop offset="100%" stop-color="#0A0A0A"/>
    </radialGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bgGrad)"/>

  ${noisePixels}

  <rect x="${frameX}" y="${frameY}" width="${frameW}" height="${frameH}"
        rx="${CORNER_RADIUS}" ry="${CORNER_RADIUS}"
        fill="${CHROME_BG}" stroke="rgba(91,154,123,0.2)" stroke-width="1"/>

  <rect x="${frameX}" y="${frameY}" width="${frameW}" height="${CHROME_H}"
        rx="${CORNER_RADIUS}" ry="${CORNER_RADIUS}" fill="${CHROME_BG}"/>
  <rect x="${frameX}" y="${frameY + CORNER_RADIUS}" width="${frameW}" height="${CHROME_H - CORNER_RADIUS}" fill="${CHROME_BG}"/>

  <line x1="${frameX}" y1="${frameY + CHROME_H}" x2="${frameX + frameW}" y2="${frameY + CHROME_H}"
        stroke="rgba(91,154,123,0.12)" stroke-width="1"/>

  <circle cx="${frameX + 18}" cy="${frameY + 18}" r="5" fill="${DOT_RED}"/>
  <circle cx="${frameX + 36}" cy="${frameY + 18}" r="5" fill="${DOT_YELLOW}"/>
  <circle cx="${frameX + 54}" cy="${frameY + 18}" r="5" fill="${DOT_GREEN}"/>

  <rect x="${frameX + urlBarX}" y="${frameY + urlBarY}" width="${urlBarW}" height="${urlBarH}"
        rx="4" ry="4" fill="${URL_BAR_BG}"/>
  <text x="${frameX + urlBarX + urlBarW / 2}" y="${frameY + urlBarY + 14}"
        font-family="ui-monospace, monospace" font-size="11" fill="${URL_TEXT}"
        text-anchor="middle">${displayUrl}</text>

  <rect x="${frameX}" y="${frameY}" width="${frameW}" height="${frameH}"
        rx="${CORNER_RADIUS}" ry="${CORNER_RADIUS}"
        fill="none" stroke="rgba(91,154,123,0.25)" stroke-width="1"/>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: screenshot, left: screenshotLeft, top: screenshotTop }])
  .png()
  .toFile(outputPath);

console.log(`✓ Written to ${outputPath}`);

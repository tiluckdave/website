import fs from "fs";
import path from "path";

export function getInterBoldFont(): Buffer {
  const fontPath = path.join(process.cwd(), "public/fonts/InterBold.ttf");
  return fs.readFileSync(fontPath);
}

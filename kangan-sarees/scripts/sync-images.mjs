/**
 * Copies `images/` (project root) → `public/images/` with stable kk-* names
 * so Vite can serve them at /images/...
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcDir = path.join(root, "images");
const dstDir = path.join(root, "public", "images");

const LUCID_MAP = [
  [
    "kk-lucid-mens-kurta.jpg",
    "lucid-origin_A_professional_studio_photograph_of_an_adult_Indian_man_wearing_a_traditional_ku-0.jpg",
  ],
  [
    "kk-lucid-kurti.jpg",
    "lucid-origin_A_professional_studio_photograph_of_an_adult_Indian_woman_wearing_a_stylish_kurt-0.jpg",
  ],
  [
    "kk-lucid-lehenga.jpg",
    "lucid-origin_A_professional_studio_photograph_of_an_adult_Indian_woman_wearing_an_elegant_ful-0.jpg",
  ],
  [
    "kk-lucid-dress-material.jpg",
    "lucid-origin_A_professional_studio_photograph_of_neatly_arranged_dress_material_sets_fabric_b-0.jpg",
  ],
  [
    "kk-lucid-handloom-saree.jpg",
    "lucid-origin_A_professionally_styled_fashion_photograph_of_an_Indian_woman_wearing_a_handloom-0.jpg",
  ],
];

function main() {
  if (!fs.existsSync(srcDir)) {
    console.log("No `images/` folder at project root — nothing to sync.");
    return;
  }

  fs.mkdirSync(dstDir, { recursive: true });

  const gemini = fs
    .readdirSync(srcDir)
    .filter((f) => /^Gemini.*\.png$/i.test(f))
    .sort();

  gemini.forEach((name, i) => {
    const dest = path.join(dstDir, `kk-gemini-${String(i + 1).padStart(2, "0")}.png`);
    fs.copyFileSync(path.join(srcDir, name), dest);
    console.log("→", path.basename(dest));
  });

  for (const [destName, srcName] of LUCID_MAP) {
    const from = path.join(srcDir, srcName);
    if (fs.existsSync(from)) {
      fs.copyFileSync(from, path.join(dstDir, destName));
      console.log("→", destName);
    }
  }

  const bedsheet = path.join(dstDir, "bedsheet.png");
  if (fs.existsSync(bedsheet)) {
    fs.copyFileSync(bedsheet, path.join(dstDir, "kk-bedsheet.png"));
    console.log("→ kk-bedsheet.png (from bedsheet.png)");
  }

  console.log("Done. Refresh the app (catalog seed may need a bump for localStorage).");
}

main();

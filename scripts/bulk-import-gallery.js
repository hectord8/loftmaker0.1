import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing required env vars:");
  console.error("  NEXT_PUBLIC_SANITY_PROJECT_ID — set in .env.local");
  console.error("  NEXT_PUBLIC_SANITY_DATASET   — set in .env.local");
  console.error("  SANITY_TOKEN                 — create at https://manage.sanity.io");
  process.exit(1);
}

const imagesDir = process.argv[2];
if (!imagesDir) {
  console.error("Usage: node scripts/bulk-import-gallery.js <path-to-images>");
  process.exit(1);
}

const resolvedDir = path.resolve(imagesDir);
if (!fs.existsSync(resolvedDir)) {
  console.error(`Directory not found: ${resolvedDir}`);
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, useCdn: false });

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tiff", ".bmp"]);

function getImageFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.isFile() && imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(path.join(dir, entry.name));
    }
  }
  files.sort();
  return files;
}

async function uploadImages(filePaths) {
  const assets = [];
  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    const fileName = path.basename(filePath);
    console.log(`[${i + 1}/${filePaths.length}] Uploading ${fileName}...`);
    try {
      const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
        filename: fileName,
      });
      assets.push(asset);
    } catch (err) {
      console.error(`  Failed to upload ${fileName}: ${err.message}`);
    }
  }
  return assets;
}

async function main() {
  console.log("Scanning for images...");
  const files = getImageFiles(resolvedDir);
  if (files.length === 0) {
    console.error("No image files found in directory.");
    process.exit(1);
  }
  console.log(`Found ${files.length} images.\n`);

  const assets = await uploadImages(files);
  if (assets.length === 0) {
    console.error("No assets were uploaded.");
    process.exit(1);
  }
  console.log(`\nUploaded ${assets.length} images successfully.`);

  const galleryImages = assets.map((asset, i) => ({
    _type: "object",
    _key: `img_${Date.now()}_${i}`,
    image: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    caption: "",
    featured: i < 6,
  }));

  const doc = {
    _type: "gallery",
    title: "cotswold way",
    images: galleryImages,
  };

  console.log("Creating gallery document...");
  const result = await client.create(doc);
  console.log(`\nDone! Gallery created with ID: ${result._id}`);
  console.log(`View at: /studio/structure/gallery;${result._id}`);
}

main().catch((err) => {
  console.error("Script failed:", err);
  process.exit(1);
});

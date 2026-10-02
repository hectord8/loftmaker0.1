#!/usr/bin/env node
/**
 * Lists every outstanding fact the owner still needs to supply.
 *
 * Placeholders never render to visitors (see Components/Seo/Placeholder.js), so
 * this script is how they are reviewed: it scans the content files, the site
 * config and the Sanity schemas and prints everything still marked as
 * outstanding, with file and line references.
 *
 *   npm run placeholders
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["content", "data", "sanity/schemaTypes", "Components", "app"];
const EXTENSIONS = new Set([".js", ".jsx", ".mjs", ".ts", ".tsx"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", ".vercel"]);
// This file is where the marker is implemented, so scanning it reports itself.
const SKIP_FILES = new Set(["scripts/placeholders.mjs", "Components/Seo/Placeholder.js"]);

const MARKERS = [
  { label: "OWNER TO PROVIDE", pattern: /OWNER TO PROVIDE[^"'\n]*/g },
  { label: "null value", pattern: /^\s*\w+:\s*null,\s*$/g },
];

function* walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) yield* walk(full);
    else if (EXTENSIONS.has(full.slice(full.lastIndexOf(".")))) yield full;
  }
}

const files = [];
for (const root of ROOTS) {
  for (const file of walk(root)) {
    if (!SKIP_FILES.has(relative(process.cwd(), file))) files.push(file);
  }
}

const results = [];

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, index) => {
    for (const marker of MARKERS) {
      marker.pattern.lastIndex = 0;
      const matches = line.match(marker.pattern);
      if (!matches) continue;
      for (const match of matches) {
        results.push({
          file: relative(process.cwd(), file),
          line: index + 1,
          marker: marker.label,
          text: match.trim(),
        });
      }
    }
  });
}

if (results.length === 0) {
  console.log("No outstanding placeholders in code.");
} else {
  console.log(`${results.length} outstanding item(s) in code:\n`);

  let currentFile;
  for (const result of results) {
    if (result.file !== currentFile) {
      currentFile = result.file;
      console.log(`\n  ${currentFile}`);
    }
    console.log(`    ${String(result.line).padStart(4)}  [${result.marker}] ${result.text}`);
  }
}

/*
  Outstanding items that live in Sanity rather than in code. Alt text is now a
  required field on the gallery and project schemas, so existing documents
  cannot be saved without it - but documents already in the dataset still have
  null alt text until an editor fills it in.
*/
console.log(
  "\n  Outstanding in Sanity (not visible here):\n" +
    "    - Gallery alt text. The field is now required, but the existing images\n" +
    "      in the dataset have none. Until they do, the front end falls back to\n" +
    "      a generated description built from location and build type.\n" +
    "    - Project documents. There are none; /projects shows an empty state\n" +
    "      rather than sample projects.\n" +
    "    - Reviews. None exist, so no review or aggregateRating is emitted.\n" +
    "    - Accreditations. None exist, so no badge is shown.\n",
);

console.log(
  "None of these are rendered to visitors. To preview them in the browser, run\n" +
    "the site with NEXT_PUBLIC_SHOW_PLACEHOLDERS=true.\n",
);
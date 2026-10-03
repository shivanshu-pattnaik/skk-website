import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "img");
const OUT_DIR = path.join(ROOT, "img", "web");
const PUBLIC_DIR = path.join(ROOT, "public");
const APP_DIR = path.join(ROOT, "src", "app");
const MANIFEST = path.join(ROOT, "src", "lib", "image-manifest.ts");

const MAX_EDGE = 1600;
const LOGO_EDGE = 1024;
const OG = { w: 1200, h: 630 };

/**
 * @typedef {{
 *   file: string,
 *   id: string,
 *   alt: string,
 *   caption: string,
 *   category: "stage" | "portraits" | "ensemble",
 *   role?: "hero" | "band" | "guru" | "guru-detail" | "about",
 * }} Entry
 */

/** @type {Entry[]} */
const CATALOG = [
  {
    file: "IMG_3818.jpg.jpeg",
    id: "ipaf-hero",
    alt: "Odissi dancers forming a many-armed tableau on stage at the International Performing Arts Festival, Puri",
    caption: "International Performing Arts Festival, Puri",
    category: "stage",
    role: "hero",
  },
  {
    file: "IMG_3836.jpg.jpeg",
    id: "guru-closeup",
    alt: "Guru Itishree Pattnaik performing, hands held in a mudra, wearing silver jewellery and a white tiara",
    caption: "Guru Itishree Pattnaik in performance",
    category: "stage",
    role: "guru-detail",
  },
  {
    file: "guru_itishree_pattnaik.jpeg",
    id: "guru-portrait",
    alt: "Portrait of Guru Itishree Pattnaik in full Odissi costume with arms raised above her head",
    caption: "Guru Itishree Pattnaik",
    category: "portraits",
    role: "guru",
  },
  {
    file: "team.jpeg",
    id: "team-panorama",
    alt: "The full Sukumari Kalakendra troupe assembled on stage in colourful Odissi costumes",
    caption: "The academy in assembly",
    category: "ensemble",
    role: "band",
  },
  {
    file: "111.jpg.jpeg",
    id: "duo-studio",
    alt: "Two young Odissi dancers in a studio, one kneeling and one standing, hands joined above them",
    caption: "Studio practice",
    category: "portraits",
    role: "about",
  },
  {
    file: "555.jpg.jpeg",
    id: "duo-kneel",
    alt: "Two dancers in green, yellow and red Odissi costume holding a paired pose",
    caption: "A paired abhinaya",
    category: "portraits",
    role: "about",
  },
  {
    file: "222.jpeg",
    id: "ensemble-green-wall",
    alt: "Sixteen dancers of the academy photographed together against a green foliage wall",
    caption: "The ensemble",
    category: "ensemble",
  },
  {
    file: "888.png",
    id: "ensemble-portrait",
    alt: "Group portrait of the academy's dancers in silver jewellery and silk costumes against a green wall",
    caption: "Group portrait",
    category: "ensemble",
  },
  {
    file: "2222.jpg.jpeg",
    id: "solo-closeup",
    alt: "Close-up of a dancer in silver temple jewellery against a violet backdrop",
    caption: "Temple jewellery",
    category: "portraits",
  },
  {
    file: "333.jpeg",
    id: "duo-indoor",
    alt: "Two dancers in yellow and red costumes performing together indoors",
    caption: "Rehearsal duet",
    category: "portraits",
  },
  {
    file: "444.jpg.jpeg",
    id: "solo-stage",
    alt: "A solo dancer in an orange and red costume on stage under blue light",
    caption: "Solo performance",
    category: "stage",
  },
  {
    file: "44444.jpg.jpeg",
    id: "ipaf-group",
    alt: "Seven dancers in a closing formation on stage beneath the International Performing Arts Festival, Puri 2024 banner",
    caption: "IPAF, Puri 2024",
    category: "stage",
  },
  {
    file: "666.jpg.jpeg",
    id: "festival-stage",
    alt: "The troupe performing on a red-carpeted festival stage before a decorated backdrop",
    caption: "Festival stage",
    category: "stage",
  },
  {
    file: "66666.jpg.jpeg",
    id: "stage-pose-six",
    alt: "Six dancers holding a sculptural group pose on stage",
    caption: "Ensemble formation",
    category: "stage",
  },
  {
    file: "777.jpeg",
    id: "stage-nine",
    alt: "Nine dancers in kneeling and standing Odissi poses across a brightly lit stage",
    caption: "Full troupe on stage",
    category: "stage",
  },
  {
    file: "77777.jpg.jpeg",
    id: "stage-six-formation",
    alt: "Six dancers in a tiered formation with arms raised on a festival stage",
    caption: "Festival performance",
    category: "stage",
  },
  {
    file: "999.jpg.jpeg",
    id: "group-award",
    alt: "Dancers of the academy assembled with a memento before a festival banner",
    caption: "National-level festival, 2024",
    category: "ensemble",
  },
  {
    file: "11111.jpg.jpeg",
    id: "award-memento",
    alt: "The troupe gathered on stage while a memento is presented",
    caption: "Recognition on stage",
    category: "ensemble",
  },
];

const LOGO = "logo.png";
const OG_SOURCE = "IMG_3818.jpg.jpeg";

const kb = (n) =>
  n >= 1024 * 1024
    ? `${(n / 1024 / 1024).toFixed(2)} MB`
    : `${(n / 1024).toFixed(0)} KB`;

const ident = (id) =>
  id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function optimize(entry) {
  const input = path.join(SRC_DIR, entry.file);
  const output = path.join(OUT_DIR, `${entry.id}.webp`);
  const before = (await fs.stat(input)).size;

  await sharp(input, { limitInputPixels: false })
    .rotate()
    .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, effort: 5 })
    .toFile(output);

  const after = (await fs.stat(output)).size;
  const meta = await sharp(output).metadata();
  return { before, after, width: meta.width, height: meta.height };
}

async function buildLogo() {
  const input = path.join(SRC_DIR, LOGO);
  const webpOut = path.join(OUT_DIR, "logo.webp");
  const t0 = Date.now();

  await sharp(input, { limitInputPixels: false, sequentialRead: true })
    .resize(LOGO_EDGE, LOGO_EDGE, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 86, effort: 6 })
    .toFile(webpOut);

  // Emblem-only crop (drops the baked-in wordmark) for compact headers.
  // sharp applies `.trim()` before `.extract()`, so the crop is a separate pass.
  const markOut = path.join(OUT_DIR, "logo-mark.webp");
  const cropped = await sharp(webpOut)
    // Emblem ends at y=826; the wordmark occupies y=832+.
    .extract({ left: 0, top: 0, width: 1024, height: 830 })
    .png()
    .toBuffer();
  await sharp(cropped)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 6 })
    .resize(440, 440, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 86, effort: 6 })
    .toFile(markOut);

  // App-router icon: silver mark on a dark plate so it stays visible on light tabs.
  const iconOut = path.join(APP_DIR, "icon.png");
  const mark = await sharp(webpOut)
    .resize(400, 400, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 26, g: 20, b: 16, alpha: 1 },
    },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(iconOut);

  return {
    before: (await fs.stat(input)).size,
    after: (await fs.stat(webpOut)).size,
    mark: (await fs.stat(markOut)).size,
    ms: Date.now() - t0,
  };
}

async function buildOgImage() {
  const output = path.join(PUBLIC_DIR, "og-image.jpg");
  await sharp(path.join(SRC_DIR, OG_SOURCE), { limitInputPixels: false })
    .resize(OG.w, OG.h, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output);
  return (await fs.stat(output)).size;
}

function writeManifest() {
  const L = [];
  L.push(`// AUTO-GENERATED by scripts/optimize-images.mjs — do not edit by hand.`);
  L.push(`// Regenerate with: npm run images`);
  L.push(``);
  L.push(`import type { StaticImageData } from "next/image";`);
  L.push(``);
  for (const e of CATALOG) {
    L.push(`import ${ident(e.id)} from "../../img/web/${e.id}.webp";`);
  }
  L.push(`import logoSrc from "../../img/web/logo.webp";`);
  L.push(`import logoMarkSrc from "../../img/web/logo-mark.webp";`);
  L.push(``);
  L.push(`export type GalleryCategory = "stage" | "portraits" | "ensemble";`);
  L.push(``);
  L.push(`export interface Photo {`);
  L.push(`  id: string;`);
  L.push(`  src: StaticImageData;`);
  L.push(`  alt: string;`);
  L.push(`  caption: string;`);
  L.push(`  category: GalleryCategory;`);
  L.push(`}`);
  L.push(``);
  L.push(`export const logo: StaticImageData = logoSrc;`);
  L.push(`export const logoMark: StaticImageData = logoMarkSrc;`);

  const named = [
    ["hero", "heroImage"],
    ["band", "bandImage"],
    ["guru", "guruImage"],
    ["guru-detail", "guruDetailImage"],
  ];
  for (const [role, name] of named) {
    const e = CATALOG.find((x) => x.role === role);
    if (e) L.push(`export const ${name}: StaticImageData = ${ident(e.id)};`);
  }

  const about = CATALOG.filter((e) => e.role === "about");
  L.push(
    `export const aboutImages: StaticImageData[] = [${about.map((e) => ident(e.id)).join(", ")}];`,
  );
  L.push(``);

  L.push(`export const photos: Photo[] = [`);
  for (const e of CATALOG) {
    L.push(`  {`);
    L.push(`    id: ${JSON.stringify(e.id)},`);
    L.push(`    src: ${ident(e.id)},`);
    L.push(`    alt: ${JSON.stringify(e.alt)},`);
    L.push(`    caption: ${JSON.stringify(e.caption)},`);
    L.push(`    category: ${JSON.stringify(e.category)},`);
    L.push(`  },`);
  }
  L.push(`];`);
  L.push(``);

  L.push(`export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [`);
  L.push(`  { id: "all", label: "All" },`);
  L.push(`  { id: "stage", label: "Stage" },`);
  L.push(`  { id: "portraits", label: "Portraits" },`);
  L.push(`  { id: "ensemble", label: "Ensemble" },`);
  L.push(`];`);
  L.push(``);

  return L.join("\n");
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.mkdir(APP_DIR, { recursive: true });
  await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

  console.log(`Optimizing ${CATALOG.length} photographs -> img/web/\n`);
  let totalIn = 0;
  let totalOut = 0;

  for (const e of CATALOG) {
    if (!(await exists(path.join(SRC_DIR, e.file)))) {
      console.warn(`  ! missing source: ${e.file}`);
      continue;
    }
    const r = await optimize(e);
    totalIn += r.before;
    totalOut += r.after;
    console.log(
      `  ${e.id.padEnd(20)} ${String(r.width).padStart(4)}x${r.height}  ${kb(r.before).padStart(10)} -> ${kb(r.after).padStart(9)}`,
    );
  }

  console.log(`\nLogo (28800x28800 source)...`);
  const logo = await buildLogo();
  console.log(`  logo                 ${kb(logo.before)} -> ${kb(logo.after)} (${logo.ms} ms)`);
  totalIn += logo.before;
  totalOut += logo.after;

  const ogSize = await buildOgImage();
  console.log(`  og-image.jpg         ${kb(ogSize)}`);

  await fs.writeFile(MANIFEST, writeManifest(), "utf8");
  console.log(`\nWrote src/lib/image-manifest.ts`);
  console.log(`Photographs: ${kb(totalIn)} -> ${kb(totalOut)} (${((totalOut / totalIn) * 100).toFixed(1)}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

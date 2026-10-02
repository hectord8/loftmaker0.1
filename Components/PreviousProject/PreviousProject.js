"use client";

import Image from "next/image";

import styles from "./previous.module.css";
import { projectImages } from "@/data/projects";

/**
 * Previous-project image strip.
 *
 * The alt text was "Previous loft conversion / extension project photo 1", "2",
 * "3" and so on, which is a different string per image saying the same thing -
 * the classic pattern screen-reader users hit when they hear "photo, photo,
 * photo". If the image has real descriptive alt text in data/projects.js that
 * is used; otherwise the image is marked decorative, because a repeated
 * generic string is worse than no announcement at all.
 *
 * `quality={90}` was hardcoded, which Next 16 warns about: only configured
 * qualities are allowed. The default is used now, and 90 is set centrally in
 * next.config.mjs for the images that genuinely need it.
 */
export default function PreviousProject({ images = projectImages }) {
  return (
    <div className={styles.gallery}>
      {images.map((image, i) => (
        <div className={styles.item} key={`${image.name || "image"}-${i}`}>
          <Image
            src={image.url}
            /*
              data/projects.js carries the owner's own description of each
              photograph, so that is used as alt text. Where no description
              exists the image is left with an empty alt, which correctly marks
              it as decorative instead of announcing a generic string.
            */
            alt={image.alt || image.name || ""}
            fill
            sizes="(max-width: 800px) 100vw, 25vw"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
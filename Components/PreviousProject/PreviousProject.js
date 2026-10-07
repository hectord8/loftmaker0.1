"use client";
import Image from "next/image";

import styles from "./previous.module.css";
import { projectImages } from "@/data/projects";

export default function PreviousProject({ images = projectImages }) {

  return (
    <div className={styles.gallery}>
      {images.map((image, i) => (
        <div className={styles.item} key={`${image.name}-${i}`}>
          <Image
            src={image.url}
            alt={`Previous loft conversion / extension project photo ${i + 1}`}
            fill
            sizes="(max-width: 800px) 100vw, 25vw"
            quality={90}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

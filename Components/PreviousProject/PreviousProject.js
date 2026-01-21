'use client'
import Image from "next/image";

import styles from "./previous.module.css"
export default function PreviosuProject() {


  const fallbackImages = [
    { url: "/current-project-images/1.jpg", name: "Cotswold way external right" },
    { url: "/current-project-images/2.jpg", name: "Cotswold way external left" },
    { url: "/current-project-images/3.jpg", name: "Cotswold way bathroom left" },
    { url: "/current-project-images/4.jpg", name: "Cotswold way bathroom right" }
  ];

  return (
    <div className={styles.gallery}>
      {fallbackImages.map((image, i) => (
        <div className={styles.item} key={`${image.name}-${i}`}>
          <Image
            src={image.url}
            alt={`Previous loft conversion / extension project photo ${i + 1}`}
            fill
            sizes="100vw"
            quality={90}
          />
        </div>
      ))}
    </div>
  );
}

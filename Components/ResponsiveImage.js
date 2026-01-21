import Image from "next/image";
import styles from "../app/page.module.css"
export default function ResponsiveImage({large , medium, small }) {
  return (
    <picture>
      <source media="(max-width: 640px)" srcSet={small} />
      <source media="(max-width: 1024px)" srcSet={medium} />
    
      <Image
        className={styles.image}
        src={large}
        alt="Hero"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }} 
      />

    </picture>
  );
}

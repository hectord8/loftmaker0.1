import ResponsiveImage from "@/Components/ResponsiveImage";
import styles from "../app/(site)/page.module.css";

export default function Hero() {
  return (
    <div
      className={`${styles.mainImage} ${styles.heroReveal}`}
      aria-label="Loft conversion hero image"
    >
      <ResponsiveImage
        large="/Main_Images/35.jpg"
        medium="/Main_Images/External-surrey.jpg"
        small="/Main_Images/Bathroom-1736X981.jpg"
        alt="Loft conversion project exterior"
        priority
        sizes="100vw"
      />
    </div>
  );
}

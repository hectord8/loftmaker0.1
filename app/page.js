import Image from "next/image";
import styles from "./page.module.css";
import ResponsiveImage from "@/Components/ResponsiveImage";

export default function Home() {
  return (
    <div className={styles.page}>
     <div className={styles.mainImage}>
      <ResponsiveImage
        large="/Main_images/35.jpg"
        medium="/Main_images/External-surrey.jpg"
        small="/Main_images/bathroom-1736X981.jpg"
        alt="LoftMaker project photo"
      />

     </div>
    </div>
  );
}

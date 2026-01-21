import Image from "next/image";
import styles from "./page.module.css";
import ResponsiveImage from "@/Components/ResponsiveImage";
import PreviosuProject from "@/Components/PreviousProject/PreviousProject";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <div className={styles.mainImage}>
          <ResponsiveImage
            large="/Main_images/35.jpg"
            medium="/Main_images/External-surrey.jpg"
            small="/Main_images/bathroom-1736X981.jpg"
            alt="LoftMaker project photo"
          />
        </div>
        <section className={styles.intro}>
          <h3>Complex Problems, innovative solutions</h3>
          <p>
            From start to finish, we ensure that your loft conversion meets your
            desired requirements. With a focus on exceptional service and a
            high-quality finish, we take pride in our workmanship. We offer a
            range of loft conversion options to suit any lifestyle and budget,
            recognizing that every home is unique. Whether you're looking for a
            simple conversion or a more complex project, our skilled team can
            bring your ideas to life. Our commitment to quality and
            customization guarantees a loft conversion or extension that is
            truly personalized for you.
          </p>
          <h4>Contact us today to schedule a free intial consultation.</h4>
        </section>
        <section>
          <h3>Previous Project</h3>
        <PreviosuProject/>
        </section>
      </div>
    </div>
  );
}

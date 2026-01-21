import PreviousProject from "@/Components/PreviousProject/PreviousProject";
import styles from "../app/page.module.css";

export default function PreviousProjectsSection() {
  return (
    <section
      className={styles.PreviousProject}
      aria-labelledby="previous-projects-heading"
    >
      <h2 id="previous-projects-heading">Previous Project</h2>
      <PreviousProject />
    </section>
  );
}

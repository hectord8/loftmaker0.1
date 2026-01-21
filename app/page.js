import styles from "./page.module.css";
import Hero from "@/Components/Hero";
import Intro from "@/Components/Intro";
import PreviousProjectsSection from "@/Components/PreviousProjectsSection";
import Services from "@/Components/Services";

export default function Home() {
  return (
    <div className={styles.page}>
      <Hero />
      <Intro />
      <PreviousProjectsSection />
      <Services />
    </div>
  );
}

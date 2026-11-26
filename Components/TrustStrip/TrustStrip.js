import styles from "./truststrip.module.css";

export default function TrustStrip({ points = [] }) {
  if (points.length === 0) return null;
  return (
    <ul className={styles.strip} aria-label="Why choose us">
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}

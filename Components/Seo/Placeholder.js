import styles from "./inner.module.css";

/**
 * Marks a fact that still needs the owner's input.
 *
 * Placeholders are never shown to visitors. They render only when
 * NEXT_PUBLIC_SHOW_PLACEHOLDERS=true, which is a pre-launch review flag; the
 * default build omits them from the DOM entirely so the site cannot ship a
 * stray "OWNER TO PROVIDE" string.
 *
 * `npm run placeholders` prints every outstanding placeholder by scanning the
 * content files, so the list is reviewable without turning the flag on.
 */
export default function Placeholder({ text, children }) {
  const note = text || children;

  if (!note) return null;
  if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "true") return null;

  return (
    <p className={styles.placeholder} role="note">
      <strong>PLACEHOLDER:</strong> {note}
    </p>
  );
}
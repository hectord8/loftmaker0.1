import { getImageProps } from "next/image";

import styles from "../app/(site)/page.module.css";

/**
 * Art-directed hero image.
 *
 * The design uses a different photograph at each breakpoint, which is what
 * <picture> is for. It used to point at raw full-size JPEGs, so a phone
 * downloaded a 1.5MB unoptimised file. getImageProps gives each <source> its
 * own srcset and format fallbacks from the Next.js optimiser, so the art
 * direction survives without the weight.
 *
 * `src` is stripped from the <source> elements: inside <picture>, a <source>
 * must use srcset, and leaving src on it is invalid markup that the browser
 * ignores and Chrome logs as a deprecation.
 */
export default function ResponsiveImage({
  large,
  medium,
  small,
  alt,
  sizes = "100vw",
  priority = false,
  quality,
}) {
  const common = { alt, fill: true, sizes, priority, ...(quality ? { quality } : {}) };

  const propsFor = (src) => {
    const { src: _src, ...rest } = getImageProps({ ...common, src }).props;
    return rest;
  };

  const largeProps = getImageProps({ ...common, src: large }).props;

  return (
    <picture>
      {small ? <source media="(max-width: 640px)" {...propsFor(small)} /> : null}
      {medium ? <source media="(max-width: 1024px)" {...propsFor(medium)} /> : null}
      {/* alt is also inside largeProps; declared here so the a11y lint can see it. */}
      <img {...largeProps} alt={alt} className={`${styles.image} ${largeProps.className || ""}`} />
    </picture>
  );
}
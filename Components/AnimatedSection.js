"use client";

import useInView from "@/Components/useInView";

export default function AnimatedSection({ children, className = "", ...props }) {
  const { ref, isVisible } = useInView();

  return (
    <section
      ref={ref}
      className={`${className} motionReveal`}
      data-motion-visible={isVisible ? "true" : "false"}
      {...props}
    >
      {children}
    </section>
  );
}

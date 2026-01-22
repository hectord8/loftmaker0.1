"use client";

import { useEffect, useRef, useState } from "react";

export default function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerOptions = useRef({ threshold: 0.2, ...options });

  useEffect(() => {
    if (!ref.current || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      observerOptions.current
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isVisible]);

  return { ref, isVisible };
}

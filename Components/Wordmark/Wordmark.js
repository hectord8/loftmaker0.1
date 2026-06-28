"use client";

import { useEffect, useRef, useCallback } from "react";
import styles from "./wordmark.module.css";

const THRESHOLD = 0.4;
const ORANGE = "#E87A2A";

function luminance(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function parseRgb(str) {
  const m = str.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (m) return luminance(`#${(+m[1]).toString(16).padStart(2, "0")}${(+m[2]).toString(16).padStart(2, "0")}${(+m[3]).toString(16).padStart(2, "0")}`);
  return null;
}

function sampleFromImage(ctx, img, vx, vy) {
  const rect = img.getBoundingClientRect();
  const px = (vx - rect.left) / rect.width;
  const py = (vy - rect.top) / rect.height;
  if (px < 0 || px > 1 || py < 0 || py > 1) return null;

  const nw = img.naturalWidth;
  const nh = img.naturalHeight;
  if (!nw || !nh) return null;

  const containerAspect = rect.width / rect.height;
  const imgAspect = nw / nh;

  let sx, sy;

  if (imgAspect > containerAspect) {
    const displayW = rect.height * imgAspect;
    const offsetX = (displayW - rect.width) / 2;
    sx = ((px * rect.width + offsetX) / displayW) * nw;
    sy = py * nh;
  } else {
    const displayH = rect.width / imgAspect;
    const offsetY = (displayH - rect.height) / 2;
    sx = px * nw;
    sy = ((py * rect.height + offsetY) / displayH) * nh;
  }

  try {
    ctx.clearRect(0, 0, 1, 1);
    ctx.drawImage(img, sx, sy, 1, 1, 0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return luminance(`#${d[0].toString(16).padStart(2, "0")}${d[1].toString(16).padStart(2, "0")}${d[2].toString(16).padStart(2, "0")}`);
  } catch {
    return null;
  }
}

function getEffectiveLuminance(el, cx, cy) {
  if (!el) return 1;
  let minL = 1;

  // Check background color walking up the DOM
  let cur = el;
  while (cur && cur !== document.body && cur !== document.documentElement) {
    const cs = getComputedStyle(cur);
    const bg = cs.backgroundColor;
    if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
      const l = parseRgb(bg);
      if (l !== null) minL = Math.min(minL, l);
    }
    cur = cur.parentElement;
  }

  // Check if there's text at this point using caretRangeFromPoint
  const range = document.caretRangeFromPoint(cx, cy);
  if (range && range.startContainer) {
    const textNode = range.startContainer;
    const textParent = textNode.parentElement;
    if (textParent) {
      const cs = getComputedStyle(textParent);
      const color = cs.color;
      if (color) {
        const l = parseRgb(color);
        if (l !== null) minL = Math.min(minL, l);
      }
      // Also check the element's own text color
      const elColor = el.nodeType === 1 ? getComputedStyle(el).color : null;
      if (elColor) {
        const l = parseRgb(elColor);
        if (l !== null) minL = Math.min(minL, l);
      }
    }
  }

  return minL;
}

export default function Wordmark({ text }) {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const frameId = useRef(null);

  const check = useCallback(() => {
    const chars = ref.current?.children;
    if (!chars) return;

    const headerEl = ref.current.closest("header");
    if (!headerEl) return;

    const ctx = canvasRef.current?.getContext("2d");

    // Temporarily disable pointer events so elementFromPoint
    // returns content behind the fixed header
    const oldPE = headerEl.style.pointerEvents;
    headerEl.style.pointerEvents = "none";

    for (const span of chars) {
      const r = span.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;

      const el = document.elementFromPoint(cx, cy);
      if (!el) continue;

      let l = null;

      let targetEl = el.tagName === "PICTURE" ? el.querySelector("img") : el;
      if (ctx && targetEl && (targetEl.tagName === "IMG" || targetEl.tagName === "VIDEO" || targetEl.tagName === "CANVAS")) {
        l = sampleFromImage(ctx, targetEl, cx, cy);
      }

      if (l === null) {
        l = getEffectiveLuminance(el, cx, cy);
      }

      span.style.color = l !== null && l < THRESHOLD ? "" : ORANGE;
    }

    headerEl.style.pointerEvents = oldPE;
  }, []);

  const handleScroll = useCallback(() => {
    if (frameId.current) cancelAnimationFrame(frameId.current);
    frameId.current = requestAnimationFrame(check);
  }, [check]);

  useEffect(() => {
    check();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [handleScroll, check]);

  return (
    <h1 ref={ref} className={styles.wordmark} aria-label={text}>
      <canvas ref={canvasRef} width={1} height={1} className={styles.canvas} />
      {text.split("").map((ch, i) => (
        <span
          key={i}
          data-index={i}
          className={ch === " " ? styles.space : undefined}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h1>
  );
}

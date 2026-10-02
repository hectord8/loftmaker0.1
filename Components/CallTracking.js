"use client";

import { useEffect } from "react";

import { attachCallTracking } from "@/lib/analytics";

/**
 * Mounted once in the site layout. Click-to-call events are delegated, so any
 * tel: link added later - header, footer, CTA band, sticky call button - is
 * tracked without wiring a handler on each one.
 */
export default function CallTracking() {
  useEffect(() => attachCallTracking(), []);
  return null;
}

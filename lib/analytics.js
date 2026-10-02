/**
 * Analytics helpers.
 *
 * The site loads Google Analytics only when NEXT_PUBLIC_GA_ID is set, and
 * Vercel Analytics is always present. Every call is a no-op when gtag is not
 * loaded, so event tracking never breaks a page.
 */

function gtag() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag.apply(window, arguments);
}

/** Conversion event when a contact form is successfully submitted. */
export function trackLead(details = {}) {
  gtag("event", "generate_lead", {
    event_category: "contact",
    event_label: details.projectType || "enquiry",
    ...details,
  });
}

/** Click-to-call event on every phone link. */
export function trackCallClick(placement = "unknown") {
  gtag("event", "click_to_call", {
    event_category: "contact",
    event_label: placement,
  });
}

/** Attach a click-to-call listener to any anchor with a tel: href. */
export function attachCallTracking() {
  if (typeof document === "undefined") return () => {};
  const onClick = (event) => {
    const link = event.target instanceof Element && event.target.closest('a[href^="tel:"]');
    if (!link) return;
    const placement = link.dataset.callPlacement || link.getAttribute("aria-label") || "unknown";
    trackCallClick(placement);
  };
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}

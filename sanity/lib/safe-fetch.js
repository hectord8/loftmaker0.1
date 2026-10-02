import { sanityClient } from "./client";

/**
 * Fetch that never throws. Every page that touches the CMS renders the page
 * first and quietly omits the CMS-driven block if the dataset is empty or
 * unreachable, rather than returning a 500.
 */
export async function safeFetch(query, params) {
  try {
    return await sanityClient.fetch(query, params);
  } catch (error) {
    console.error("[sanity] fetch failed:", error?.message || error);
    return null;
  }
}

/**
 * JSON-LD via a typed helper. Pass one node, or an array of nodes to emit a
 * single @graph document.
 */
export default function JsonLd({ data }) {
  if (!data) return null;
  if (Array.isArray(data) && data.length === 0) return null;

  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data }
    : { "@context": "https://schema.org", ...data };

  // Escaping "<" keeps any stray "</script>" inside CMS or form text from
  // closing the script element early.
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

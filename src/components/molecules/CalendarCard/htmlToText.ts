const HTML_TAG = /<\/?[a-z][^>]*>/i;

export const containsHtml = (text: string) => HTML_TAG.test(text);

/** Parses without running anything: scripts in a parsed document stay inert. */
export const parseHtml = (html: string) =>
  new DOMParser().parseFromString(html, 'text/html').body;

/**
 * Flattens a calendar description to one line of plain text. Descriptions from
 * invitations are often HTML, which would otherwise show up as raw tags.
 */
export const htmlToText = (description: string) => {
  if (!containsHtml(description)) {
    return description.replace(/\s+/g, ' ').trim();
  }

  const body = parseHtml(
    // Keep words on either side of a line or block break apart.
    description.replace(/<(br|\/p|\/div|\/li|\/h[1-6])\b[^>]*>/gi, '$& ')
  );
  body.querySelectorAll('script, style').forEach((node) => node.remove());

  return (body.textContent ?? '').replace(/\s+/g, ' ').trim();
};

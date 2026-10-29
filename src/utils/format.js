/** Small formatting helpers shared by several components. */

export function formatYear(year, fallback) {
  return year ? String(year) : fallback;
}

export function firstLetter(text) {
  return (text ?? "?").trim().charAt(0).toUpperCase();
}

export function truncate(text, max = 120) {
  if (!text) return "";
  return text.length > max ? `${text.slice(0, max).trimEnd()}...` : text;
}

/** Turns an Open Library subject slug ("science_fiction") into a readable label. */
export function humanizeSubject(subject) {
  return subject.replace(/_/g, " ");
}

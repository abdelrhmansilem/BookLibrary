/**
 * The six sections the library exposes.
 * `subject` is the value sent to Open Library; `id` is used for the translation key
 * (`categories.items.<id>.title`).
 */
export const CATEGORIES = [
  { id: "fiction", subject: "fiction" },
  { id: "science", subject: "science" },
  { id: "history", subject: "history" },
  { id: "children", subject: "juvenile fiction" },
  { id: "poetry", subject: "poetry" },
  { id: "philosophy", subject: "philosophy" },
];

export function findCategory(id) {
  return CATEGORIES.find((category) => category.id === id) ?? null;
}

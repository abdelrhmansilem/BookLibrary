/**
 * The only module in the app that talks to the network.
 * API docs: https://openlibrary.org/developers/api
 */

const BASE_URL = "https://openlibrary.org";
const COVER_URL = "https://covers.openlibrary.org/b/id";
const TIMEOUT_MS = 12000;
export const PAGE_SIZE = 24;

/** Fields we ask the search endpoint for: keeps responses small and predictable. */
const SEARCH_FIELDS = "key,title,author_name,first_publish_year,cover_i,subject";

export class ApiError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status ?? 0;
    this.code = code ?? "unknown";
  }
}

async function request(path, { signal, timeout = TIMEOUT_MS } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  const forwardAbort = () => controller.abort();
  signal?.addEventListener("abort", forwardAbort);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new ApiError(`Open Library answered ${response.status}`, {
        status: response.status,
        code: response.status === 404 ? "not-found" : "http",
      });
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error?.name === "AbortError") {
      // The caller aborted (navigation) or the timeout fired.
      throw new ApiError("The request was cancelled or timed out", { code: "timeout" });
    }
    throw new ApiError("Network error while contacting Open Library", { code: "network" });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", forwardAbort);
  }
}

export function coverUrl(coverId, size = "M") {
  return coverId ? `${COVER_URL}/${coverId}-${size}.jpg` : null;
}

/** Turns a raw Open Library document into the shape the UI expects. */
export function normalizeBook(raw) {
  if (!raw) return null;
  const id = (raw.key ?? raw.works?.[0]?.key ?? "").replace("/works/", "");
  const rawDescription = raw.description;
  const description =
    typeof rawDescription === "string" ? rawDescription : (rawDescription?.value ?? null);

  return {
    id,
    title: raw.title ?? "Untitled",
    author: raw.author_name?.[0] ?? null,
    year: raw.first_publish_year ?? null,
    cover: coverUrl(raw.cover_i ?? raw.covers?.[0]),
    description,
    subjects: (raw.subject ?? raw.subjects ?? []).slice(0, 10),
  };
}

/**
 * Searches the catalogue. `subject` narrows the query to one Open Library subject.
 */
export async function searchBooks({ query = "", subject = "", page = 1, limit = PAGE_SIZE, signal } = {}) {
  const parts = [];
  if (query.trim()) parts.push(query.trim());
  if (subject) parts.push(`subject:"${subject}"`);
  const q = parts.join(" ") || "subject:fiction";

  const params = new URLSearchParams({
    q,
    page: String(page),
    limit: String(limit),
    fields: SEARCH_FIELDS,
  });

  const data = await request(`/search.json?${params.toString()}`, { signal });
  const books = (data.docs ?? []).map(normalizeBook).filter((book) => book?.id);

  return {
    books,
    total: data.numFound ?? books.length,
    page,
  };
}

/** The books shown on the home page. Falls back to a search if trending is unavailable. */
export async function getTrendingBooks(limit = 12, { signal } = {}) {
  try {
    const data = await request(`/trending/daily.json?limit=${limit}`, { signal });
    return (data.works ?? []).map(normalizeBook).filter((book) => book?.id);
  } catch (error) {
    if (error.code === "timeout") throw error;
    const { books } = await searchBooks({ subject: "fiction", limit, signal });
    return books;
  }
}

/**
 * Full details for one work.
 *
 * The `/works/{id}` endpoint carries the description and subjects but not the author
 * or the first publish year, so we ask the search endpoint for the same work in
 * parallel and merge both answers. If the second request fails we still render the page.
 */
export async function getBook(id, { signal } = {}) {
  const params = new URLSearchParams({
    q: `key:"/works/${id}"`,
    fields: SEARCH_FIELDS,
    limit: "1",
  });

  const [work, meta] = await Promise.all([
    request(`/works/${id}.json`, { signal }),
    request(`/search.json?${params.toString()}`, { signal }).catch(() => null),
  ]);

  const doc = meta?.docs?.[0] ?? null;

  return normalizeBook({
    ...work,
    author_name: doc?.author_name,
    first_publish_year: doc?.first_publish_year,
    cover_i: doc?.cover_i ?? work.covers?.[0],
  });
}

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import { useI18n } from "../context/I18nContext";
import { useDebounce } from "../hooks/useDebounce";
import { searchBooks } from "../services/openLibrary";
import BookGrid from "../components/books/BookGrid";
import SearchBar from "../components/books/SearchBar";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Spinner from "../components/ui/Spinner";
import styles from "./Books.module.css";

const EMPTY_RESULT = { books: [], total: 0, page: 1 };

export default function Books() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();

  const subject = searchParams.get("subject") ?? "";
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 450);

  const [page, setPage] = useState(1);
  const [result, setResult] = useState(EMPTY_RESULT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  // A new search term or category starts again from page 1 with an empty list.
  useEffect(() => {
    setPage(1);
    setResult(EMPTY_RESULT);
  }, [debouncedQuery, subject]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    searchBooks({ query: debouncedQuery, subject, page, signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        setResult((previous) => ({
          books: page === 1 ? data.books : [...previous.books, ...data.books],
          total: data.total,
          page,
        }));
        setLoading(false);
      })
      .catch((caught) => {
        if (controller.signal.aborted) return;
        setError(caught);
        setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery, subject, page, attempt]);

  const handleSubjectChange = (event) => {
    const value = event.target.value;
    const next = new URLSearchParams(searchParams);
    if (value) next.set("subject", value);
    else next.delete("subject");
    setSearchParams(next, { replace: true });
  };

  const hasMore = result.books.length < result.total;
  const showEmpty = !loading && !error && result.books.length === 0;

  return (
    <div className="section">
      <header className={styles.header}>
        <h1 className={styles.title}>{t("books.title")}</h1>
        <p className={styles.subtitle}>{t("books.subtitle")}</p>
      </header>

      <div className={styles.controls}>
        <SearchBar value={query} onChange={setQuery} onSubmit={() => setPage(1)} />

        <div className={styles.selectWrapper}>
          <label htmlFor="subject" className={styles.label}>
            {t("books.subjectLabel")}
          </label>
          <select id="subject" className={styles.select} value={subject} onChange={handleSubjectChange}>
            <option value="">{t("books.allSubjects")}</option>
            {CATEGORIES.map((category) => (
              <option key={category.id} value={category.subject}>
                {t(`categories.items.${category.id}.title`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!loading && !error && result.total > 0 && (
        <p className={styles.count}>{result.total.toLocaleString()} {t("common.results")}</p>
      )}

      {loading && page === 1 && <Spinner label={t("common.loading")} />}
      {error && <ErrorMessage onRetry={() => setAttempt((value) => value + 1)} />}

      {showEmpty && (
        <EmptyState
          title={t("books.noResults")}
          hint={t("books.noResultsHint")}
          action={
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => {
                setQuery("");
                setSearchParams({}, { replace: true });
              }}
            >
              {t("common.clear")}
            </button>
          }
        />
      )}

      {result.books.length > 0 && (
        <>
          <BookGrid books={result.books} />
          <div className={styles.more}>
            {hasMore && (
              <button
                type="button"
                className={styles.moreButton}
                onClick={() => setPage((value) => value + 1)}
                disabled={loading}
              >
                {loading ? t("common.loading") : t("books.loadMore")}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

import { Link, useParams } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { useI18n } from "../context/I18nContext";
import { useFetch } from "../hooks/useFetch";
import { getBook } from "../services/openLibrary";
import BookCover from "../components/books/BookCover";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Spinner from "../components/ui/Spinner";
import { ArrowIcon, HeartIcon } from "../components/ui/Icons";
import styles from "./BookDetails.module.css";

export default function BookDetails() {
  const { id } = useParams();
  const { t } = useI18n();
  const { isFavourite, toggleFavourite } = useFavourites();

  const { data: book, loading, error, retry } = useFetch((signal) => getBook(id, { signal }), [id]);

  if (loading) return <Spinner label={t("book.loading")} />;

  if (error) {
    if (error.code === "not-found") {
      return (
        <div className="section">
          <EmptyState
            title={t("book.notFound")}
            hint={t("book.notFoundHint")}
            action={
              <Link to="/books" className={styles.backLink}>
                <ArrowIcon className="flip-rtl" />
                {t("common.back")}
              </Link>
            }
          />
        </div>
      );
    }
    return (
      <div className="section">
        <ErrorMessage onRetry={retry} />
      </div>
    );
  }

  if (!book) return null;

  const favourite = isFavourite(book.id);
  const meta = [
    { label: t("common.author"), value: book.author ?? t("common.unknownAuthor") },
    { label: t("common.year"), value: book.year ?? t("common.unknownYear") },
  ];

  return (
    <div className="section">
      <Link to="/books" className={styles.backLink}>
        <ArrowIcon className="flip-rtl" />
        {t("common.back")}
      </Link>

      <article className={styles.book}>
        <div className={styles.coverColumn}>
          <BookCover
            src={book.cover}
            title={book.title}
            alt={t("common.coverOf", { title: book.title })}
            large
          />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{book.title}</h1>

          <dl className={styles.meta}>
            {meta.map((item) => (
              <div key={item.label} className={styles.metaItem}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            className={favourite ? `${styles.favourite} ${styles.favouriteOn}` : styles.favourite}
            onClick={() => toggleFavourite(book.id)}
            aria-pressed={favourite}
          >
            <HeartIcon filled={favourite} />
            {favourite ? t("books.unfavourite") : t("books.favourite")}
          </button>

          <section className={styles.description}>
            <h2 className={styles.sectionTitle}>{t("book.description")}</h2>
            <p dir="auto">{book.description ?? t("book.noDescription")}</p>
          </section>

          {book.subjects.length > 0 && (
            <section>
              <h2 className={styles.sectionTitle}>{t("book.subjects")}</h2>
              <ul className={styles.subjects}>
                {book.subjects.map((subject) => (
                  <li key={subject} className={styles.subject}>
                    {subject}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <a
            className={styles.external}
            href={`https://openlibrary.org/works/${book.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("book.openInOpenLibrary")}
            <ArrowIcon className={`${styles.externalIcon} flip-rtl`} />
          </a>
        </div>
      </article>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useFavourites } from "../../context/FavouritesContext";
import { useI18n } from "../../context/I18nContext";
import { HeartIcon } from "../ui/Icons";
import BookCover from "./BookCover";
import styles from "./BookCard.module.css";

export default function BookCard({ book }) {
  const { t } = useI18n();
  const { isFavourite, toggleFavourite } = useFavourites();
  const favourite = isFavourite(book.id);
  const author = book.author ?? t("common.unknownAuthor");
  const year = book.year ?? t("common.unknownYear");

  return (
    <article className={styles.card}>
      <Link to={`/books/${book.id}`} className={styles.link}>
        <div className={styles.coverWrapper}>
          <BookCover src={book.cover} title={book.title} alt={t("common.coverOf", { title: book.title })} />
        </div>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{author}</p>
        <p className={styles.year}>{year}</p>
      </Link>

      <button
        type="button"
        className={favourite ? `${styles.favourite} ${styles.favouriteOn}` : styles.favourite}
        onClick={() => toggleFavourite(book.id)}
        aria-pressed={favourite}
        aria-label={favourite ? t("books.unfavourite") : t("books.favourite")}
        title={favourite ? t("books.unfavourite") : t("books.favourite")}
      >
        <HeartIcon filled={favourite} />
      </button>
    </article>
  );
}

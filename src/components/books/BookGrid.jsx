import BookCard from "./BookCard";
import styles from "./BookGrid.module.css";

export default function BookGrid({ books }) {
  return (
    <ul className={styles.grid}>
      {books.map((book) => (
        <li key={book.id}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
}

import { useState } from "react";
import { firstLetter } from "../../utils/format";
import { BookIcon } from "../ui/Icons";
import styles from "./BookCover.module.css";

/**
 * Renders the cover when it exists, and a deterministic placeholder when it does not.
 * Open Library has no cover for a large part of the catalogue, so this is a normal path,
 * not an edge case.
 */
export default function BookCover({ src, title, alt, large = false }) {
  const [failed, setFailed] = useState(false);
  const className = large ? `${styles.cover} ${styles.large}` : styles.cover;

  if (!src || failed) {
    return (
      <div className={`${className} ${styles.placeholder}`} role="img" aria-label={alt}>
        <BookIcon className={styles.placeholderIcon} />
        <span className={styles.placeholderLetter}>{firstLetter(title)}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

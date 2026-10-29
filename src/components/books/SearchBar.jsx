import { useId } from "react";
import { useI18n } from "../../context/I18nContext";
import { SearchIcon } from "../ui/Icons";
import styles from "./SearchBar.module.css";

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  autoFocus = false,
  size = "md",
}) {
  const { t } = useI18n();
  const inputId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form className={size === "lg" ? `${styles.form} ${styles.large}` : styles.form} role="search" onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="visually-hidden">
        {t("books.searchLabel")}
      </label>
      <SearchIcon className={styles.icon} />
      <input
        id={inputId}
        type="search"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? t("books.searchPlaceholder")}
        autoFocus={autoFocus}
        autoComplete="off"
      />
      <button type="submit" className={styles.button}>
        {t("common.search")}
      </button>
    </form>
  );
}

import { CATEGORIES } from "../data/categories";
import { useI18n } from "../context/I18nContext";
import CategoryCard from "../components/books/CategoryCard";
import styles from "./Categories.module.css";

export default function Categories() {
  const { t } = useI18n();

  return (
    <div className="section">
      <header className={styles.header}>
        <h1 className={styles.title}>{t("categories.title")}</h1>
        <p className={styles.subtitle}>{t("categories.subtitle")}</p>
      </header>

      <ul className={styles.grid}>
        {CATEGORIES.map((category) => (
          <li key={category.id}>
            <CategoryCard category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
}

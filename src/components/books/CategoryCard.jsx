import { Link } from "react-router-dom";
import { useI18n } from "../../context/I18nContext";
import { ArrowIcon } from "../ui/Icons";
import styles from "./CategoryCard.module.css";

export default function CategoryCard({ category }) {
  const { t } = useI18n();

  return (
    <Link to={`/books?subject=${encodeURIComponent(category.subject)}`} className={styles.card}>
      <h3 className={styles.title}>{t(`categories.items.${category.id}.title`)}</h3>
      <p className={styles.description}>{t(`categories.items.${category.id}.description`)}</p>
      <span className={styles.more}>
        {t("categories.view")}
        <ArrowIcon className={`${styles.arrow} flip-rtl`} />
      </span>
    </Link>
  );
}

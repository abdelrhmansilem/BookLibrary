import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>{t("notFound.title")}</h1>
      <p className={styles.text}>{t("notFound.text")}</p>
      <Link to="/" className={styles.button}>
        {t("notFound.cta")}
      </Link>
    </div>
  );
}

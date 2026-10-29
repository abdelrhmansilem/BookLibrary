import { Link } from "react-router-dom";
import { useI18n } from "../../context/I18nContext";
import { BookIcon } from "../ui/Icons";
import styles from "./Footer.module.css";

// Computed once at module scope: reading the clock during render is impure.
const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brandColumn}>
          <span className={styles.brand}>
            <BookIcon className={styles.brandIcon} />
            BookLibrary
          </span>
          <p className={styles.muted}>{t("footer.about")}</p>
        </div>

        <div>
          <h2 className={styles.heading}>{t("footer.links")}</h2>
          <ul className={styles.links}>
            <li>
              <Link to="/books">{t("nav.books")}</Link>
            </li>
            <li>
              <Link to="/categories">{t("nav.categories")}</Link>
            </li>
            <li>
              <Link to="/about">{t("nav.about")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("nav.contact")}</Link>
            </li>
            <li>
              <Link to="/docs">{t("nav.docs")}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={styles.heading}>{t("footer.credits")}</h2>
          <p className={styles.muted}>
            <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">
              {t("footer.dataCredit")}
            </a>
          </p>
          <p className={styles.muted}>{t("footer.builtBy")}</p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          {t("footer.rights")} — <span dir="ltr">© {YEAR} BookLibrary</span>
        </p>
      </div>
    </footer>
  );
}

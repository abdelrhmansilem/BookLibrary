import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import { useI18n } from "../context/I18nContext";
import { useFetch } from "../hooks/useFetch";
import { getTrendingBooks } from "../services/openLibrary";
import BookGrid from "../components/books/BookGrid";
import CategoryCard from "../components/books/CategoryCard";
import SearchBar from "../components/books/SearchBar";
import ErrorMessage from "../components/ui/ErrorMessage";
import Spinner from "../components/ui/Spinner";
import { ArrowIcon } from "../components/ui/Icons";
import styles from "./Home.module.css";

const STEPS = [
  { title: "home.step1Title", text: "home.step1Text" },
  { title: "home.step2Title", text: "home.step2Text" },
  { title: "home.step3Title", text: "home.step3Text" },
];

export default function Home() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { data: books, loading, error, retry } = useFetch(
    (signal) => getTrendingBooks(10, { signal }),
    [],
  );

  const handleSearch = (value) => {
    const trimmed = value.trim();
    navigate(trimmed ? `/books?q=${encodeURIComponent(trimmed)}` : "/books");
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{t("brand.tagline")}</p>
          <h1 className={styles.heroTitle}>{t("home.heroTitle")}</h1>
          <p className={styles.heroText}>{t("home.heroText")}</p>
          <div className={styles.heroSearch}>
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              placeholder={t("home.searchPlaceholder")}
              size="lg"
            />
          </div>
          <div className={styles.heroActions}>
            <Link to="/books" className={styles.primaryButton}>
              {t("home.heroCta")}
            </Link>
            <Link to="/categories" className={styles.secondaryButton}>
              {t("home.heroSecondary")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <header className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>{t("home.featured")}</h2>
            <p className={styles.sectionText}>{t("home.featuredText")}</p>
          </div>
          <Link to="/books" className={styles.viewAll}>
            {t("home.viewAll")}
            <ArrowIcon className="flip-rtl" />
          </Link>
        </header>

        {loading && <Spinner label={t("common.loading")} />}
        {error && <ErrorMessage onRetry={retry} />}
        {books && <BookGrid books={books} />}
      </section>

      <section className="section">
        <header className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>{t("home.categories")}</h2>
            <p className={styles.sectionText}>{t("home.categoriesText")}</p>
          </div>
        </header>
        <ul className={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
        </ul>
      </section>

      <section className={`section ${styles.steps}`}>
        <h2 className={styles.sectionTitle}>{t("home.howItWorks")}</h2>
        <ol className={styles.stepList}>
          {STEPS.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber}>{index + 1}</span>
              <h3 className={styles.stepTitle}>{t(step.title)}</h3>
              <p className={styles.stepText}>{t(step.text)}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useI18n } from "../context/I18nContext";
import { markdownTitle, renderMarkdown } from "../utils/markdown";
import overview from "../docs/01-overview.md?raw";
import architecture from "../docs/02-architecture.md?raw";
import routing from "../docs/03-routing.md?raw";
import state from "../docs/04-state-and-context.md?raw";
import dataLayer from "../docs/05-data-layer.md?raw";
import styling from "../docs/06-styling-and-theming.md?raw";
import i18n from "../docs/07-i18n.md?raw";
import deployment from "../docs/08-deployment.md?raw";
import styles from "./DocsPage.module.css";

const DOCS = [
  { id: "overview", content: overview },
  { id: "architecture", content: architecture },
  { id: "routing", content: routing },
  { id: "state", content: state },
  { id: "data-layer", content: dataLayer },
  { id: "styling", content: styling },
  { id: "i18n", content: i18n },
  { id: "deployment", content: deployment },
];

export default function DocsPage() {
  const { t } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeId = searchParams.get("doc") ?? DOCS[0].id;
  const active = DOCS.find((doc) => doc.id === activeId) ?? DOCS[0];

  // Rendering markdown returns React elements, so we memoise it per selected file.
  const content = useMemo(() => renderMarkdown(active.content), [active]);

  return (
    <div className="section">
      <header className={styles.header}>
        <h1 className={styles.title}>{t("docs.title")}</h1>
        <p className={styles.subtitle}>{t("docs.subtitle")}</p>
      </header>

      <div className={styles.layout}>
        <nav className={styles.sidebar} aria-label={t("docs.contents")}>
          <p className={styles.sidebarTitle}>{t("docs.contents")}</p>
          <ul className={styles.list}>
            {DOCS.map((doc) => (
              <li key={doc.id}>
                <button
                  type="button"
                  className={doc.id === active.id ? `${styles.item} ${styles.itemActive}` : styles.item}
                  onClick={() => setSearchParams({ doc: doc.id }, { replace: true })}
                  aria-current={doc.id === active.id ? "page" : undefined}
                >
                  {markdownTitle(doc.content, doc.id)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <article className={styles.article}>{content}</article>
      </div>
    </div>
  );
}

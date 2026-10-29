import { useI18n } from "../context/I18nContext";
import styles from "./About.module.css";

const STACK = [
  { name: "React 19", why: "components, hooks, context" },
  { name: "Vite 8", why: "dev server and production build" },
  { name: "React Router 7", why: "client-side routing" },
  { name: "CSS Modules", why: "scoped styling without extra tooling" },
  { name: "Open Library API", why: "real book data, no key required" },
  { name: "localStorage", why: "theme, language and favourites" },
];

const TEAM = [
  { role: "about.lead", name: "Abdelrhman Silem" },
  { role: "about.member", name: "TBD" },
  { role: "about.member", name: "TBD" },
  { role: "about.member", name: "TBD" },
];

export default function About() {
  const { t } = useI18n();

  return (
    <div className={`section ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("about.title")}</h1>
        <p className={styles.intro}>{t("about.intro")}</p>
      </header>

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>{t("about.whatTitle")}</h2>
        <p className={styles.text}>{t("about.whatText")}</p>
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>{t("about.stackTitle")}</h2>
        <ul className={styles.stack}>
          {STACK.map((item) => (
            <li key={item.name} className={styles.stackItem}>
              <strong>{item.name}</strong>
              <span>{item.why}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>{t("about.teamTitle")}</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{t("about.teamName")}</th>
                <th scope="col">{t("about.teamRole")}</th>
              </tr>
            </thead>
            <tbody>
              {TEAM.map((member, index) => (
                <tr key={`${member.role}-${index}`}>
                  <td>{member.name}</td>
                  <td>{t(member.role)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.block}>
        <h2 className={styles.sectionTitle}>{t("about.dataTitle")}</h2>
        <p className={styles.text}>
          {t("about.dataText")}{" "}
          <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">
            openlibrary.org
          </a>
        </p>
      </section>
    </div>
  );
}

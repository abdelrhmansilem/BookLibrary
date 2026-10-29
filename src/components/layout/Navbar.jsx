import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useI18n } from "../../context/I18nContext";
import LanguageToggle from "../controls/LanguageToggle";
import ThemeToggle from "../controls/ThemeToggle";
import { BookIcon, CloseIcon, MenuIcon } from "../ui/Icons";
import styles from "./Navbar.module.css";

const links = [
  { to: "/", key: "nav.home", end: true },
  { to: "/books", key: "nav.books" },
  { to: "/categories", key: "nav.categories" },
  { to: "/about", key: "nav.about" },
  { to: "/contact", key: "nav.contact" },
  { to: "/docs", key: "nav.docs" },
];

export default function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Escape closes it too.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden="true">
            <BookIcon />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoName}>BookLibrary</span>
            <span className={styles.logoTagline}>{t("brand.tagline")}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label={t("nav.menu")}>
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                  }
                >
                  {t(link.key)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            className={styles.burger}
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("nav.closeMenu") : t("common.openMenu")}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* A collapsed drawer is not interactive: `inert` keeps its links out of the
          tab order and away from screen readers while `open` is false. */}
      <div
        id="mobile-menu"
        className={open ? `${styles.drawer} ${styles.drawerOpen}` : styles.drawer}
        inert={!open}
      >
        <ul className={styles.drawerList}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? `${styles.drawerLink} ${styles.drawerLinkActive}` : styles.drawerLink
                }
              >
                {t(link.key)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

import { useI18n } from "../../context/I18nContext";
import { useTheme } from "../../context/ThemeContext";
import { MoonIcon, SunIcon } from "../ui/Icons";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const label = theme === "dark" ? t("common.lightMode") : t("common.darkMode");

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

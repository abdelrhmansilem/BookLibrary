import { useI18n } from "../../context/I18nContext";
import { GlobeIcon } from "../ui/Icons";
import styles from "./LanguageToggle.module.css";

export default function LanguageToggle({ withLabel = false }) {
  const { t, toggleLang } = useI18n();
  const label = t("common.switchLanguageLabel");

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleLang}
      aria-label={label}
      title={label}
    >
      <GlobeIcon className={styles.icon} />
      {withLabel && <span>{t("common.switchLanguage")}</span>}
    </button>
  );
}

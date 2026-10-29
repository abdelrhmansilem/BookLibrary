import { useI18n } from "../../context/I18nContext";
import { ErrorIcon } from "./Icons";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ onRetry, message }) {
  const { t } = useI18n();

  return (
    <div className={styles.box} role="alert">
      <ErrorIcon className={styles.icon} />
      <p className={styles.text}>{message ?? t("common.error")}</p>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          {t("common.retry")}
        </button>
      )}
    </div>
  );
}

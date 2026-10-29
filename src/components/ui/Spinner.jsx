import styles from "./Spinner.module.css";

export default function Spinner({ label }) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}

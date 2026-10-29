import { EmptyIcon } from "./Icons";
import styles from "./EmptyState.module.css";

export default function EmptyState({ title, hint, action }) {
  return (
    <div className={styles.box}>
      <EmptyIcon className={styles.icon} />
      <h2 className={styles.title}>{title}</h2>
      {hint && <p className={styles.hint}>{hint}</p>}
      {action}
    </div>
  );
}

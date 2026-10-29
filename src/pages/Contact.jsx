import { useState } from "react";
import { useI18n } from "../context/I18nContext";
import styles from "./Contact.module.css";

const EMPTY_FORM = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const { t } = useI18n();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = (values) => {
    const next = {};
    if (!values.name.trim()) next.name = t("contact.required");
    else if (values.name.trim().length < 2) next.name = t("contact.nameTooShort");

    if (!values.email.trim()) next.email = t("contact.required");
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = t("contact.invalidEmail");

    if (!values.message.trim()) next.message = t("contact.required");
    else if (values.message.trim().length < 10) next.message = t("contact.shortMessage");
    else if (values.message.length > 500) next.message = t("contact.maxMessage");

    return next;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSent(true);
      setForm(EMPTY_FORM);
    }
  };

  const fields = [
    { name: "name", type: "text", label: "contact.name", placeholder: "contact.namePlaceholder" },
    { name: "email", type: "email", label: "contact.email", placeholder: "contact.emailPlaceholder" },
  ];

  return (
    <div className={`section ${styles.page}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("contact.title")}</h1>
        <p className={styles.subtitle}>{t("contact.subtitle")}</p>
      </header>

      <p className={styles.note}>{t("contact.demoNote")}</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {fields.map((field) => (
          <div key={field.name} className={styles.field}>
            <label htmlFor={field.name}>{t(field.label)}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={form[field.name]}
              onChange={handleChange}
              placeholder={t(field.placeholder)}
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              className={errors[field.name] ? `${styles.input} ${styles.inputError}` : styles.input}
            />
            {errors[field.name] && (
              <p id={`${field.name}-error`} className={styles.error}>
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <div className={styles.field}>
          <label htmlFor="message">{t("contact.message")}</label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            placeholder={t("contact.messagePlaceholder")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={errors.message ? `${styles.input} ${styles.inputError}` : styles.input}
          />
          {errors.message && (
            <p id="message-error" className={styles.error}>
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" className={styles.submit}>
          {t("contact.send")}
        </button>

        {sent && (
          <p className={styles.success} role="status">
            {t("contact.success")}
          </p>
        )}
      </form>
    </div>
  );
}

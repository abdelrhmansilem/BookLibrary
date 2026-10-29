import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import ar from "../locales/ar";
import en from "../locales/en";

const dictionaries = { ar, en };
const STORAGE_KEY = "booklibrary.lang";

const I18nContext = createContext(null);

function readInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {
    /* localStorage can be blocked; fall back to the browser language */
  }
  return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
}

/** Walks a dotted path such as "nav.home" inside a dictionary object. */
function lookup(dictionary, path) {
  return path.split(".").reduce((node, key) => (node && node[key] !== undefined ? node[key] : undefined), dictionary);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(readInitialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore private-mode failures */
    }
  }, [lang]);

  /**
   * Translates a dotted key. The optional `vars` object fills `{placeholders}`.
   * Falls back to English, then to the key itself, so a missing key never crashes a page.
   */
  const t = useCallback(
    (path, vars) => {
      const value = lookup(dictionaries[lang], path) ?? lookup(dictionaries.en, path);
      if (typeof value !== "string" || !vars) return value ?? path;
      return value.replace(/\{(\w+)\}/g, (match, name) => (vars[name] ?? match));
    },
    [lang],
  );

  const toggleLang = useCallback(() => {
    setLang((current) => (current === "ar" ? "en" : "ar"));
  }, []);

  const value = useMemo(
    () => ({ lang, isRtl: lang === "ar", setLang, toggleLang, t }),
    [lang, t, toggleLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside <I18nProvider>");
  return context;
}

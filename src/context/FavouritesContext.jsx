import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "booklibrary.favourites";
const FavouritesContext = createContext(null);

function readInitialFavourites() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function FavouritesProvider({ children }) {
  const [ids, setIds] = useState(readInitialFavourites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids]);

  const toggleFavourite = useCallback((id) => {
    setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }, []);

  const isFavourite = useCallback((id) => ids.includes(id), [ids]);

  const value = useMemo(
    () => ({ favourites: ids, count: ids.length, toggleFavourite, isFavourite }),
    [ids, toggleFavourite, isFavourite],
  );

  return <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>;
}

export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) throw new Error("useFavourites must be used inside <FavouritesProvider>");
  return context;
}

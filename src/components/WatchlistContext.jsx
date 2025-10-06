import { createContext, useContext, useState, useEffect } from "react";
import Footer from './Footer'

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export function WatchlistProvider({ children }) {
  // localStorage dan boshlang‘ich qiymat olish
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  // har safar watchlist o‘zgarganda localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev; // avoid duplicates
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <>
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
          {children}
        </WatchlistContext.Provider>
        <Footer/>
    </>
  );
}

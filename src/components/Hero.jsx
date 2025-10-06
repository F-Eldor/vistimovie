import React, { useState, useEffect, useRef } from "react";
import moviesData from "./movies.json";
import "./Hero.css";
import Footer from "./Footer";

export default function Hero() {
  const movies = [...moviesData, ...moviesData, ...moviesData];
  const middleIndex = moviesData.length;
  const [activeMovie, setActiveMovie] = useState(middleIndex);

  const containerRef = useRef(null);
  const movieRefs = useRef([]);

  // Klaviatura orqali o‘ng/chap yurish
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setActiveMovie((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        setActiveMovie((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Markazdagi filmni scroll markazga keltirish
  useEffect(() => {
    const container = containerRef.current;
    const activeEl = movieRefs.current[activeMovie];

    if (container && activeEl) {
      const containerWidth = container.offsetWidth;
      const activeElWidth = activeEl.offsetWidth;
      const activeElOffsetLeft = activeEl.offsetLeft;

      const scrollToPosition =
        activeElOffsetLeft - containerWidth / 2 + activeElWidth / 2;

      container.scrollTo({
        left: scrollToPosition,
        behavior: "smooth",
      });
    }

    // Cheksiz aylanish uchun
    const len = moviesData.length;
    if (activeMovie < len) {
      setTimeout(() => setActiveMovie((prev) => prev + len), 0);
    } else if (activeMovie >= movies.length - len) {
      setTimeout(() => setActiveMovie((prev) => prev - len), 0);
    }
  }, [activeMovie, moviesData.length, movies.length]);

  return (
    <>
      <div className="movies-container" ref={containerRef}>
        <div className="movies">
          {movies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              ref={(el) => (movieRefs.current[index] = el)}
              className={`movie-card ${activeMovie === index ? "active" : ""}`}
              onClick={() => setActiveMovie(index)}
            >
              <img src={movie.poster} alt={movie.title} />

              {activeMovie === index && (
                <>
                  <h3>{movie.title}</h3>
                  <button
                    className="movie-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Filming linkini yangi tabda ochish
                      if (movie.link) {
                        window.open(movie.link, "_blank");
                      } else {
                        console.warn("Movie link not found:", movie.title);
                      }
                    }}
                  >
                    Watch Now
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

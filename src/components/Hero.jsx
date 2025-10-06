import React, { useState, useEffect, useRef } from "react";
import moviesData from "./movies.json";
import "./Hero.css";
import MoviePopup from "./MoviePopUp";
import Footer from "./Footer";

export default function Hero() {
  const movies = [...moviesData, ...moviesData, ...moviesData];
  const middleIndex = moviesData.length;
  const [activeMovie, setActiveMovie] = useState(middleIndex);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const containerRef = useRef(null);
  const movieRefs = useRef([]);

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



  useEffect(() => {
    if (selectedMovie) {
      document.body.classList.add("popup-active");
    } else {
      document.body.classList.remove("popup-active");
    }
  }, [selectedMovie]);

  useEffect(() => {
    if (movieRefs.current[activeMovie] && containerRef.current) {
      const container = containerRef.current;
      const activeEl = movieRefs.current[activeMovie];

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

    const len = moviesData.length;
    if (activeMovie < len) {
      setActiveMovie((prev) => prev + len);
    } else if (activeMovie >= movies.length - len) {
      setActiveMovie((prev) => prev - len);
    }
  }, [activeMovie, movies, moviesData.length]);

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
                      setSelectedMovie(movie);
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
      <MoviePopup movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      <Footer/>
    </>
  );
}
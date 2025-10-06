import React, { useEffect, useState } from "react";
import Footer from './Footer'
import MoviePopup from "./MoviePopUp";

const API_KEY = "4d6a9476afc33055f8e786ed735de4b2";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

export default function Movies() {
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [topRatedRes, popularRes, upcomingRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`),
          fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`),
          fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
        ]);

        const [topRatedData, popularData, upcomingData] = await Promise.all([
          topRatedRes.json(),
          popularRes.json(),
          upcomingRes.json()
        ]);

        setTopRated(topRatedData.results);
        setPopular(popularData.results);
        setUpcoming(upcomingData.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleOpenPopup = (movie) => {
    setSelectedMovie({
      id: movie.id,
      title: movie.title,
      poster: `${IMG_URL}${movie.poster_path}`,
      description: movie.overview,
      rating: movie.vote_average.toFixed(1),
      link: `https://www.themoviedb.org/movie/${movie.id}`
    });
  };

  const handleClosePopup = () => setSelectedMovie(null);

  const LoadingCard = () => (
    <div className="movies-loading-card">
      <div className="movies-loading-poster"></div>
      <div className="movies-loading-title"></div>
      <div className="movies-loading-rating"></div>
      <div className="movies-loading-button"></div>
    </div>
  );

  const renderMovies = (movies, sectionIndex) => (
    <div className="movies-grid-container">
      {loading 
        ? Array.from({ length: 8 }, (_, i) => <LoadingCard key={i} />)
        : movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="movies-card" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="movies-card-inner">
                <div className="movies-poster-container">
                  <img
                    src={IMG_URL + movie.poster_path}
                    alt={movie.title}
                    className="movies-poster"
                    loading="lazy"
                  />
                  <div className="movies-poster-overlay">
                    <button
                      className="movies-quick-view"
                      onClick={() => handleOpenPopup(movie)}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="movies-card-content">
                  <h3 className="movies-title">{movie.title}</h3>
                  <div className="movies-meta">
                    <span className="movies-rating">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="movies-year">
                      {new Date(movie.release_date || movie.first_air_date).getFullYear()}
                    </span>
                  </div>
                  
                  <button
                    className="movies-details-btn"
                    onClick={() => handleOpenPopup(movie)}
                  >
                    <span>View Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
      }
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .movies-page-wrapper {
          min-height: 100vh;
          background: radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%);
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          padding: 2rem;
          position: relative;
          overflow-x: hidden;
        }

        .movies-page-wrapper::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
          pointer-events: none;
          z-index: 1;
        }

        .movies-section-title {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 900;
          margin: 4rem 0 2rem;
          text-align: center;
          background: linear-gradient(135deg, #ffffff 0%, #ff6b6b 50%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 40px rgba(255, 107, 107, 0.4);
          letter-spacing: -0.02em;
          position: relative;
          z-index: 2;
          animation: titleGlow 3s ease-in-out infinite;
        }

        @keyframes titleGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.3)); }
          50% { filter: drop-shadow(0 0 40px rgba(255, 107, 107, 0.6)); }
        }

        .movies-grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
          position: relative;
          z-index: 2;
        }

        .movies-card {
          opacity: 0;
          transform: translateY(30px);
          animation: cardAppear 0.8s ease-out forwards;
        }

        @keyframes cardAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .movies-card-inner {
          background: rgba(17, 17, 19, 0.8);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .movies-card:hover .movies-card-inner {
          transform: translateY(-12px) rotateX(5deg);
          box-shadow: 
            0 32px 64px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 107, 107, 0.3),
            0 0 60px rgba(255, 107, 107, 0.2);
        }

        .movies-poster-container {
          position: relative;
          overflow: hidden;
        }

        .movies-poster {
          width: 100%;
          height: 420px;
          object-fit: cover;
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .movies-card:hover .movies-poster {
          transform: scale(1.08);
          filter: brightness(1.1);
        }

        .movies-poster-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            180deg, 
            transparent 0%, 
            rgba(0, 0, 0, 0.3) 60%, 
            rgba(0, 0, 0, 0.8) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .movies-card:hover .movies-poster-overlay {
          opacity: 1;
        }

        .movies-quick-view {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #000;
          backdrop-filter: blur(10px);
        }

        .movies-quick-view:hover {
          background: rgba(255, 107, 107, 0.9);
          color: white;
          transform: scale(1.1);
        }

        .movies-card-content {
          padding: 1.5rem;
        }

        .movies-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 1rem;
          line-height: 1.3;
          color: #ffffff;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .movies-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .movies-rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #fbbf24;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .movies-year {
          color: #9ca3af;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .movies-details-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: none;
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .movies-details-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .movies-details-btn:hover::before {
          left: 100%;
        }

        .movies-details-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(239, 68, 68, 0.4);
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }

        .movies-details-btn:active {
          transform: translateY(0);
        }

        /* Loading States */
        .movies-loading-card {
          background: rgba(17, 17, 19, 0.5);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
          animation: pulse 2s infinite;
        }

        .movies-loading-poster {
          width: 100%;
          height: 420px;
          background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .movies-loading-title, .movies-loading-rating, .movies-loading-button {
          margin: 1rem 1.5rem 0.5rem;
          height: 20px;
          background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
          background-size: 200% 100%;
          border-radius: 4px;
          animation: shimmer 1.5s infinite;
        }

        .movies-loading-button {
          height: 40px;
          margin: 1.5rem 1.5rem 1.5rem;
          border-radius: 12px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }



        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .movies-page-wrapper {
            padding: 1rem;
          }

          .movies-grid-container {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .movies-section-title {
            font-size: 2.5rem;
            margin: 3rem 0 1.5rem;
          }

          .movies-popup-inner {
            flex-direction: column;
            padding: 1.5rem;
          }

          .movies-popup-poster {
            width: 200px;
            align-self: center;
          }

          .movies-popup-title {
            font-size: 1.5rem;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .movies-grid-container {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .movies-section-title {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="movies-page-wrapper">
        <h2 className="movies-section-title">🔥 Trending Now</h2>
        {renderMovies(popular, 0)}

        <h2 className="movies-section-title">⭐ Top Rated</h2>
        {renderMovies(topRated, 1)}

        <h2 className="movies-section-title">🎬 Coming Soon</h2>
        {renderMovies(upcoming, 2)}

        {selectedMovie && (
          <MoviePopup movie={selectedMovie} onClose={handleClosePopup} />
        )}
      </div>
      <Footer/>
    </>
  );
}
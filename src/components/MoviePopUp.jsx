import React from 'react';
import { useWatchlist } from "../components/WatchlistContext";

const MoviePopup = ({ movie, onClose }) => {
  const { addToWatchlist } = useWatchlist(); // ✅ hook ichkariga keldi

  if (!movie) return null;

  return (
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

      .movie-popup-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(25px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        animation: backdropFadeIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        cursor: pointer;
      }

      .movie-popup-container {
        background: linear-gradient(145deg, 
          rgba(15, 15, 35, 0.95) 0%, 
          rgba(26, 26, 46, 0.95) 50%, 
          rgba(22, 33, 62, 0.95) 100%
        );
        border-radius: 24px;
        max-width: 1200px;
        width: 100%;
        max-height: 90vh;
        overflow: hidden;
        position: relative;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 
          0 40px 80px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(255, 255, 255, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        animation: popupSlideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        cursor: default;
      }

      .movie-popup-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: rgba(0, 0, 0, 0.8);
        border: none;
        color: rgba(255, 255, 255, 0.7);
        width: 48px;
        height: 48px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 10;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 300;
      }

      .movie-popup-close:hover {
        background: rgba(239, 68, 68, 0.9);
        color: white;
        transform: scale(1.1) rotate(90deg);
        box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
      }

      .movie-popup-content {
        display: flex;
        gap: 3rem;
        padding: 3rem;
        position: relative;
        z-index: 2;
        min-height: 500px;
        align-items: flex-start;
      }

      .movie-popup-poster-section {
        flex-shrink: 0;
      }

      .movie-popup-poster-container {
        position: relative;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 
          0 30px 60px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(255, 255, 255, 0.1);
      }

      .movie-popup-poster {
        width: 350px;
        height: auto;
        display: block;
        border-radius: 20px;
      }

      .movie-popup-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }

      .movie-popup-title {
        font-size: clamp(2.5rem, 4vw, 4rem);
        font-weight: 900;
        margin: 0;
        background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.1;
        letter-spacing: -0.03em;
        font-family: 'Inter', sans-serif;
      }

      .movie-popup-meta {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        flex-wrap: wrap;
      }

      .movie-popup-rating {
        background: rgba(251, 191, 36, 0.2);
        border: 1px solid rgba(251, 191, 36, 0.4);
        color: #fbbf24;
        padding: 12px 20px;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .movie-popup-genre {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.8);
        padding: 8px 16px;
        border-radius: 25px;
        font-size: 0.875rem;
        font-weight: 500;
      }

      .movie-popup-description {
        color: rgba(255, 255, 255, 0.85);
        font-size: 1.125rem;
        line-height: 1.8;
        font-weight: 400;
        margin: 0;
        max-width: 600px;
      }

      .movie-popup-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        margin-top: 1rem;
      }

      .movie-popup-btn {
        padding: 16px 32px;
        border-radius: 16px;
        font-size: 1.05rem;
        font-weight: 700;
        border: none;
        cursor: pointer;
        min-width: 180px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-family: 'Inter', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .movie-popup-btn-primary {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
      }

      .movie-popup-btn-secondary {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .movie-popup-back-btn {
        position: absolute;
        bottom: 2rem;
        left: 3rem;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 8px;
      }
    `}</style>
      {/* styles */}
      <div className="movie-popup-backdrop" onClick={onClose}>
        <div className="movie-popup-container" onClick={(e) => e.stopPropagation()}>
          <button className="movie-popup-close" onClick={onClose}>×</button>

          <div className="movie-popup-content">
            <div className="movie-popup-poster-section">
              <div className="movie-popup-poster-container">
                <img src={movie.poster} alt={movie.title} className="movie-popup-poster" />
              </div>
            </div>

            <div className="movie-popup-details">
              <h1 className="movie-popup-title">{movie.title}</h1>

              <div className="movie-popup-meta">
                <div className="movie-popup-rating">⭐ {movie.rating}</div>
                <div className="movie-popup-genre">Action • Drama</div>
              </div>

              <p className="movie-popup-description">{movie.description}</p>

              <div className="movie-popup-actions">
                <a
                  href={movie.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="movie-popup-btn movie-popup-btn-primary"
                >
                  ▶ Watch Now
                </a>
                <button 
                  className="movie-popup-btn movie-popup-btn-secondary" 
                  onClick={() => addToWatchlist({
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster, // yoki IMG_URL + movie.poster_path
                    rating: movie.rating
                  })}
                >
                  ➕ Add to Watchlist
                </button>
              </div>
            </div>
          </div>

          <button className="movie-popup-back-btn" onClick={onClose}>
            ← Back to Movies
          </button>
        </div>
      </div>
    </>
  );
};

export default MoviePopup;

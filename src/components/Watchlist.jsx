import React, { useState } from "react";
import { useWatchlist } from "../components/WatchlistContext";
import MoviePopup from "../components/MoviePopUp"; // shu joyda popup komponentini import qilamiz

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .watchlist-page-wrapper {
          min-height: 100vh;
          background: radial-gradient(ellipse at top, #0f0f23 0%, #000000 100%);
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          padding: 2rem;
          position: relative;
          overflow-x: hidden;
        }

        .watchlist-page-wrapper::before {
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

        .watchlist-title {
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

        .watchlist-empty {
          text-align: center;
          font-size: 1.25rem;
          color: #9ca3af;
          margin-top: 2rem;
        }

        .watchlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
          position: relative;
          z-index: 2;
        }

        .watchlist-card {
          background: rgba(17, 17, 19, 0.8);
          border-radius: 20px;
          overflow: hidden;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1rem;
          text-align: center;
          transition: all 0.5s ease;
          box-shadow: 0 12px 24px rgba(0,0,0,0.4);
          animation: fadeIn 0.6s ease forwards;
          opacity: 0;
        }

        .watchlist-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,107,107,0.3),
            0 0 40px rgba(255,107,107,0.2);
        }

        .watchlist-poster {
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .watchlist-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0.5rem 0;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .watchlist-card span {
          display: block;
          font-size: 0.95rem;
          font-weight: 600;
          color: #fbbf24;
          margin-bottom: 1rem;
        }

        .watchlist-remove-btn {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: none;
          color: white;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .watchlist-remove-btn:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
          transform: translateY(-2px);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .watchlist-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1.5rem;
          }
          .watchlist-poster {
            height: 250px;
          }
        }

        @media (max-width: 480px) {
          .watchlist-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .watchlist-poster {
            height: 220px;
          }
        }
      `}</style>

      <div className="watchlist-page-wrapper">
        <h2 className="watchlist-title">My Watchlist</h2>

        {watchlist.length === 0 ? (
          <p className="watchlist-empty">Your watchlist is empty. Add some movies!</p>
        ) : (
          <div className="watchlist-grid">
            {watchlist.map((movie) => (
              <div 
                key={movie.id} 
                className="watchlist-card"
                onClick={() => setSelectedMovie(movie)} // kartochkani bosganda popup ochiladi
                style={{ cursor: "pointer" }}
              >
                <img src={movie.poster} alt={movie.title} className="watchlist-poster" />
                <h3>{movie.title}</h3>
                <span>⭐ {movie.rating}</span>
                <button
                  className="watchlist-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // kartochkani bosganda popup ochilmasin
                    removeFromWatchlist(movie.id);
                  }}
                >
                  ❌ Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup chaqirish */}
      {selectedMovie && (
        <MoviePopup 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </>
  );
}

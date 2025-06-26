import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { id, title, name, poster_path, release_date, first_air_date, overview, media_type } = movie;

  const movieTitle = title || name || "Unknown Title";
  const movieYear = (release_date || first_air_date || "Unknown").split("-")[0];
  const movieDesc = overview || "No description available";
  const movieImage = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "default-image.jpg";

  return (
    <div className="movie">
      <div className="movie-card clickable">
        <img src={movieImage} alt={movieTitle} />
        <div className="movie-details">
          <h2>{movieTitle}</h2>
          <p><strong>Year:</strong> {movieYear}</p>
          <p className="overview">{movieDesc.slice(0, 100)}...</p>

          {/* 🚀 Trailer Only */}
          <div className="button-row" style={{ marginTop: '1rem' }}>
            <Link
              to={`/movies/${id}`}
              state={{ media_type: media_type || 'movie' }}
              className="watch-button"
              style={{
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                background: '#007bff',
                color: 'white',
                borderRadius: '5px',
              }}
            >
              ▶️ Watch Trailer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMoviesOnArchive, getMovieFile } from '../api/archiveApi';
import MoviePlayer from './MoviePlayer';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [movieUrl, setMovieUrl] = useState(null);
  const { id, title, name, poster_path, release_date, first_air_date, overview } = movie;

  const movieTitle = title || name || "Unknown Title";
  const movieYear = (release_date || first_air_date || "Unknown").split("-")[0];
  const movieDesc = overview || "No description available";
  const movieImage = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "default-image.jpg";

  const handleWatchMovie = async (e) => {
    e.stopPropagation(); // Prevent triggering the navigate on card click
    setMovieUrl(null); // Reset current video
    const identifier = await searchMoviesOnArchive(movieTitle);
    if (identifier) {
      const url = await getMovieFile(identifier);
      if (url) setMovieUrl(url);
      else alert("No playable file found.");
    } else {
      alert("Movie not found on Internet Archive.");
    }
  };

  return (
    <div className="movie">
      <div className="movie-card clickable" onClick={() => navigate(`/movie/${id}`)}>
        <img src={movieImage} alt={movieTitle} />
        <div className="movie-details">
          <h2>{movieTitle}</h2>
          <p><strong>Year:</strong> {movieYear}</p>
          <p className="overview">{movieDesc.slice(0, 100)}...</p>
          <button onClick={handleWatchMovie} className="watch-button">
            🎬 Watch Movie
          </button>
        </div>
      </div>

      {movieUrl && (
        <div className="movie-player-overlay">
          <MoviePlayer url={movieUrl} />
        </div>
      )}
    </div>
  );
};

export default MovieCard;

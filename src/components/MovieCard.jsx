import React from 'react';
import { useNavigate } from 'react-router-dom';
const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const { id, title, name, poster_path, release_date, first_air_date, overview } = movie;
    const movieTitle = title || name || "Unknown Title";
    const movieYear = (release_date || first_air_date || "Unknown").split("-")[0];
    const movieDesc = overview || "No description available";
    const movieImage = poster_path
     ? `https://image.tmdb.org/t/p/w500${poster_path}`
     : "default-image.jpg";

     return (
        <div className="movie" onClick={() => navigate(`/movie/${id}`)}>
          <div className="movie-card clickable">
            <img src={movieImage} alt={movieTitle} />
            <div className="movie-details">
              <h2>{movieTitle}</h2>
              <p><strong>Year:</strong> {movieYear}</p>
            </div>
          </div>
        </div>
      );
    };

    export default MovieCard;

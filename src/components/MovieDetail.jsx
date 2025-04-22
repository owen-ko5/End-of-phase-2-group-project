import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = "cfdfd510ab2d960857f9947e9d4df55c";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovie(data);
      } catch {
        setError("Failed to load movie details.");
      }
    };

    const fetchTrailers = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      } catch {
        setError("Failed to load trailer.");
      }
    };

    fetchDetails();
    fetchTrailers();
  }, [id]);

  if (error) return <h3>{error}</h3>;
  if (!movie) return <h3>Loading...</h3>;

  return (
    <div className="movie-detail">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h1>{movie.title || movie.name}</h1>
      <p>{movie.overview}</p>
      {trailerKey ? (
        <div className="trailer">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      ) : (
        <p>No trailer available.</p>
      )}
    </div>
  );
};

export default MovieDetail;
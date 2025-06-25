import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const API_KEY = "cfdfd510ab2d960857f9947e9d4df55c";

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [error, setError] = useState("");

  const type = location.state?.media_type || 'movie'; // fallback to 'movie'

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setMovie(data);
      } catch {
        setError("Failed to load details.");
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        const trailer = data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
        if (trailer) setTrailerKey(trailer.key);
      } catch {
        setError("Failed to load trailer.");
      }
    };

    fetchDetails();
    fetchTrailer();
  }, [id, type]);

  if (error) return <h3>{error}</h3>;
  if (!movie) return <h3>Loading...</h3>;

  return (
    <div className="movie-detail" style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>← Back</button>

      <h1>{movie.title || movie.name}</h1>
      <p>{movie.overview}</p>

      {trailerKey ? (
        <div className="trailer" style={{ marginTop: '2rem' }}>
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
        <p style={{ marginTop: '1rem' }}>No trailer available.</p>
      )}
    </div>
  );
};

export default MovieDetail;

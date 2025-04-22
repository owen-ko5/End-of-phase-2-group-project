import React, { useState } from 'react';
import Header from './Header';
import MovieContainer from './MovieContainer';

const API_KEY = "cfdfd510ab2d960857f9947e9d4df55c";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTrending = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
      const data = await res.json();
      setMovies(data.results);
      setError("");
    } catch {
      setError("Failed to load trending movies.");
    }
  };

  const fetchCategory = async (category) => {
    try {
      const url = category === "animation"
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=16`
        : `https://api.themoviedb.org/3/discover/${category}?api_key=${API_KEY}&language=en-US&page=1`;
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setError("");
    } catch {
      setError(`Failed to load ${category}.`);
    }
  };

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=1`
      );
      const data = await res.json();
      if (data.results.length === 0) {
        setError("No results found.");
        setMovies([]);
      } else {
        setMovies(data.results);
        setError("");
      }
    } catch {
      setError("Search failed. Please try again.");
    }
  };

  return (
    <div className="App">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={searchMovies}
        onCategoryClick={fetchCategory}
        onTrendingClick={fetchTrending}
      />

      <a href="/" className="back-btn">Back to Home</a>

      {movies.length === 0 && !error && (
        <div className="landing-message">
          <h2>Welcome to EUTOPIA!</h2>
          <p>Click "Trending" to explore movies.</p>
        </div>
      )}

      <div id="movie-container">
        {error && <h3>{error}</h3>}
        {!error && movies.length > 0 && <MovieContainer movies={movies} />}
      </div>
    </div>
  );
};

export default Home;
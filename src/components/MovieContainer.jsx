import React from 'react';
import MovieCard from './MovieCard';

const MovieContainer = ({ movies }) => (
  <>
    {movies.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </>
);

export default MovieContainer;
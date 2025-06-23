import React from 'react';

const MoviePlayer = ({ url }) => {
  return (
    <div className="movie-player">
      <video controls width="100%" height="500" src={url} />
    </div>
  );
};

export default MoviePlayer;

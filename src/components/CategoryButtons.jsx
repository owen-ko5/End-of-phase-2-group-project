import React from 'react';

const CategoryButtons = ({ onCategoryClick, onTrendingClick }) => (
  <div className="category-buttons">

    <button onClick={onTrendingClick}>Trending</button>

    <button onClick={() => onCategoryClick("movie")}>Movies</button>

    <button onClick={() => onCategoryClick("tv")}>Series</button>

    <button onClick={() => onCategoryClick("animation")}>Animation</button>
    
  </div>
);

export default CategoryButtons;
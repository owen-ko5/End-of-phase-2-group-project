import React from 'react';
import SearchBar from './SearchBar';
import CategoryButtons from './CategoryButtons';

const Header = ({ searchQuery, onSearchChange, onSearch, onCategoryClick, onTrendingClick }) => (
  <header>
    <h1>🎬EUTOPIA🎬🎥🔥</h1>
    <SearchBar
      searchTerm={searchQuery}
      onSearchChange={onSearchChange}
      onSearch={onSearch}
    />
    <CategoryButtons
      onCategoryClick={onCategoryClick}
      onTrendingClick={onTrendingClick}
    />
  </header>
);

export default Header;
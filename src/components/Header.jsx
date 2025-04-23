import React from 'react';
import SearchBar from './SearchBar';
import CategoryButtons from './CategoryButtons';

const Header = ({
  searchQuery,
  onSearchChange,
  onSearch,
  onCategoryClick,
  onTrendingClick
}) => (
  <header className="header-container">
    <h1 className="header-title">🎬 EUTOPIA 🎥🔥</h1>

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
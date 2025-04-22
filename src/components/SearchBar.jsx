import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onSearch }) => (
  <div className="search-container">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search for a movie..."
      id="search-input"
    />
    <button id="search-btn" onClick={onSearch}>Search</button>
  </div>
);

export default SearchBar;
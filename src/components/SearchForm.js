// src/components/SearchForm.js
import React, { useState } from 'react';
import './SearchForm.css'; // Import CSS file for component styling

const SearchForm = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search news"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchForm;

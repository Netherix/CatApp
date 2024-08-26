import React, { useState } from 'react';
import Button from '../Button/Button'
import './Search.css'

const Search = ({ catData, handleFavorites, handleLearnMore }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const result = catData.find((cat) =>
      cat.name.toLowerCase() === searchTerm.toLowerCase()
    );
    setSearchResult(result);
    setHasSearched(true);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search for a breed"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {hasSearched && (
        searchResult ? (
          <div className="image-container">
            <h3>You Searched For: {searchResult.name}</h3>
            <img className="searched-image"
              src={`https://cdn2.thecatapi.com/images/${searchResult.reference_image_id}.jpg`}
              alt={searchResult.name}
              style={{ height: '200px', width: '200px' }}
            />
            <Button
              text="Learn More"
              onClick={handleLearnMore(searchResult)}
            />
          </div>
        ) : (
          <p>No breed found with the name "{searchTerm}".</p>
        )
      )}
    </div>
  );
};

export default Search;

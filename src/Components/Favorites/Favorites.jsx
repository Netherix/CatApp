import React from 'react';
import Button from '../Button/Button';
import './Favorites.css';

const Favorites = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="favorites-container">
      {favorites.length > 0 && (
        <>
          <h3>Favorites</h3>
          {favorites.map((image) => (
            <React.Fragment key={image.id}>
              <img
                src={image.url}
                alt={image.name}
                className="favorite-image"
              />
              <Button
                text="Remove Favorites"
                onClick={() => onRemoveFavorite(image)}
                className="button"
              />
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default Favorites;
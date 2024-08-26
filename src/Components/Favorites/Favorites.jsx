import React from 'react';
import Button from '../Button/Button';
import './Favorites.css';

const Favorites = ({ favorites, onRemoveFavorite }) => {
  return (
    <div>
      {favorites.length > 0 ? (
        <div className="favorites">
          <h3>Favorites</h3>
          {favorites.map((image) => (
            <React.Fragment key={image.id}>
              <img
                src={image.url}
                alt={image.name}
              />
              <Button
                text="Remove Favorites"
                onClick={() => onRemoveFavorite(image)}
              />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Favorites;

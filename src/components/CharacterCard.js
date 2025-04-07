import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const defaultImage = '/images/default.jpg';

  const getImagePath = () => {
    if (!character.image_url || character.image_url.trim() === '') {
      return defaultImage;
    }
    return `/images/${character.image_url}`;
  };

  return (
    <div className="character-card">
      <img
        src={getImagePath()}
        alt={character.name || 'Image personnage'}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultImage;
        }}
      />
      <h3>{character.name}</h3>
      <p>{character.general_info}</p>
      <Link to={`/character/${character.id}`}>Voir détails</Link>
    </div>
  );
};

export default CharacterCard;

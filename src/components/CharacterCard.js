import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const defaultImage = '/images/default.jpg'; // image dans public/images/
  const imageSrc = character.image_url
    ? `/images/${character.image_url}`
    : defaultImage;

  return (
    <div className="character-card">
      <img
        src={imageSrc}
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

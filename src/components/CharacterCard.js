import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const placeholderImage = 'https://dummyimage.com/300x200/cccccc/ffffff.png&text=No+Image';

  return (
    <div className="character-card">
      <h3>{character.name}</h3>
      <img
        src={character.image_url || placeholderImage}
        alt={character.name}
        onError={(e) => {
          if (e.target.src !== placeholderImage) {
            e.target.src = placeholderImage;
          }
        }}
      />
      <p>{character.general_info}</p>
      <Link to={`/character/${character.id}`}>Voir détails</Link>
    </div>
  );
};

export default CharacterCard;

import React from 'react';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  return (
    <div className="character-card">
      <img
        src={`/images/${character.image_url}`}
        alt={character.name}
      />
      <h3>{character.name}</h3>
      <p>{character.general_info}</p>
      <Link to={`/character/${character.id}`}>Voir détails</Link>
    </div>
  );
};

export default CharacterCard;

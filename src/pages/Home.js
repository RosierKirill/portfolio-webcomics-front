import React, { useState, useEffect } from 'react';
import API from '../utils/api'; // ajuste le chemin si besoin
import CharacterCard from '../components/CharacterCard';

const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await API.get('/characters');
        setCharacters(response.data);
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="container">
      <h1>Personnages</h1>
      {characters.length === 0 ? (
        <p>Aucun personnage à afficher</p>
      ) : (
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

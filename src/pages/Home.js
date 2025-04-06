import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';

const Home = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/characters`);
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

import React from 'react';
import axios from 'axios';
import CharacterForm from '../components/CharacterForm';
import { useParams, useNavigate } from 'react-router-dom';

const AddEditCharacter = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/characters/${id}`, formData, config);
        navigate(`/character/${id}`);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/characters`, formData, config);
        navigate('/');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Modifier un personnage' : 'Ajouter un personnage'}</h1>
      <CharacterForm characterId={id} onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEditCharacter;

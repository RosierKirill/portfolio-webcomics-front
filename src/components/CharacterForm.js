import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterForm = ({ characterId, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    general_info: '',
    description: '',
    history: '',
    image_url: '',
    model3d_url: '',
  });

  useEffect(() => {
    let isMounted = true;

    const fetchCharacter = async () => {
      try {
        if (characterId) {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/characters/${characterId}`);
          if (isMounted) {
            setFormData(data);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du personnage:', error);
      }
    };

    fetchCharacter();

    return () => { isMounted = false; };
  }, [characterId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Nom" />
      <input name="general_info" value={formData.general_info} onChange={handleChange} placeholder="Infos générales" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <textarea name="history" value={formData.history} onChange={handleChange} placeholder="Histoire" />
      <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="URL de l'image" />
      <input name="model3d_url" value={formData.model3d_url} onChange={handleChange} placeholder="URL du modèle 3D" />
      <button type="submit">{characterId ? 'Mettre à jour' : 'Ajouter'}</button>
    </form>
  );
};

export default CharacterForm;

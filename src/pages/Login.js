import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = process.env.REACT_APP_API_URL || "https://portfolio-webcomics-back-production.up.railway.app/api";
      const { data } = await axios.post(`${API_URL}/users/login`, formData);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error('Erreur:', error);
      alert("Échec de la connexion. Vérifie ton email et mot de passe.");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;

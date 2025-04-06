import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ history }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/users/register`, formData)
      .then(() => window.location.href = '/login')
      .catch(error => console.error('Erreur:', error));
  };

  return (
    <div>
      <h1>Inscription</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
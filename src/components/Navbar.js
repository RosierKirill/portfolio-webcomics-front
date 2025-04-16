import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Accueil</Link>

      {token ? (
        <>
          <Link to="/add-character" className="button">Ajouter un personnage</Link>
          <button onClick={handleLogout} className="button button-secondary">Déconnexion</button>
        </>
      ) : (
        <>
          <Link to="/login" className="button">Connexion</Link>
          <Link to="/register" className="button button-secondary">Inscription</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;

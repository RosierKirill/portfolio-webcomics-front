import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEditCharacter from './pages/AddEditCharacter';
import About from './pages/About'; // Ajout

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-character" element={<AddEditCharacter />} />
        <Route path="/edit-character/:id" element={<AddEditCharacter />} />
        <Route path="/about" element={<About />} /> {/* Nouvelle route */}
      </Routes>
    </Router>
  );
}

export default App;
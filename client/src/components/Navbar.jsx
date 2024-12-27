import React from 'react';
import { Link } from 'react-router-dom'; // Utilisation de Link pour la navigation
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#accueil">Accueil</a></li>
        <li><a href="#menu">Menu</a></li>
        {/* Utilisation de Link pour le lien vers la page de connexion */}
        <li><Link to="/login">Login</Link></li>
        <li><a href="#commande">Commande</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaApple } from 'react-icons/fa'; // Importer les icônes
import '../styles/Login.css';
import backgroundImage from '../assets/images/login-background.jpg'; // Importer l'image de fond
import axios from 'axios'; // Importer axios pour envoyer les requêtes HTTP

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setMessage(response.data.message);

      // Si la connexion est réussie, vous pouvez stocker le token JWT
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <h2 className="login-title">Se connecter</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Se connecter</button>
        </form>
        
        {message && <p>{message}</p>}

        <div className="social-login">
          <p>Ou connectez-vous avec :</p>
          <div className="social-icons">
            <a href="#" className="social-icon facebook"><FaFacebook size={30} color="#3b5998" /></a>
            <a href="#" className="social-icon google"><FaGoogle size={30} color="#db4437" /></a>
            <a href="#" className="social-icon apple"><FaApple size={30} color="#000" /></a>
          </div>
        </div>

        <div className="signup-link">
          <p>Pas de compte ? <Link to="/signup">Créer un compte</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

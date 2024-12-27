import React from 'react';
import { Link } from 'react-router-dom'; // Import pour créer des liens
import Navbar from '../components/Navbar';
import '../styles/HomePage.css';
import pizzaBackground from '../assets/images/pizza-background.jpg'; 

const HomePage = () => {
  const handleScroll = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page" style={{ backgroundImage: `url(${pizzaBackground})` }}>
      <Navbar>
        <nav>
          <Link to="/login" className="nav-link">Se connecter</Link>
        </nav>
      </Navbar>
      <div className="hero-section">
        <div className="welcome-container">
          <h1 className="title">Bienvenue sur Pizza Time!</h1>
          <div className="arrow" onClick={handleScroll}>▼</div>
        </div>
      </div>
      <div id="about-section" className="about-section">
        <h2>À propos de Pizza Time</h2>
        <p>Découvrez nos pizzas, notre menu et commandez facilement en ligne !</p>
      </div>
    </div>
  );
};

export default HomePage;

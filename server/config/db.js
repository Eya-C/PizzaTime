const mongoose = require('mongoose');
require('dotenv').config();  // Charger les variables d'environnement depuis le fichier .env

// Utilisation de l'URI MongoDB depuis les variables d'environnement
const MONGO_URI = process.env.MONGO_URI;

// Connexion à la base de données MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connexion réussie à MongoDB');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB:', error.message);
        process.exit(1); // Arrêter l'application si la connexion échoue
    }
};

// Exporter la fonction pour l'utiliser dans d'autres parties du projet
module.exports = connectDB;

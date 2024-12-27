const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pizzasData = require('./data/pizzas');
const usersData = require('./data/users');  // Assurez-vous de créer un fichier users.js similaire à pizzas.js
const adminsData = require('./data/admins');  // Idem pour admins.js
const Pizza = require('./models/Pizza');
const User = require('./models/User');
const Admin = require('./models/Admin');

dotenv.config();
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connecté à la base de données MongoDB'))
    .catch((error) => console.log('Erreur de connexion à MongoDB:', error));

// Middleware pour parser le JSON
app.use(express.json());

// Fonction pour peupler la base de données avec les données de test
const seedDatabase = async () => {
    try {
        // Insertion des données de pizzas
        await Pizza.insertMany(pizzasData);
        console.log('Pizzas insérées dans la base de données');

        // Insertion des utilisateurs
        await User.insertMany(usersData);
        console.log('Utilisateurs insérés dans la base de données');

        // Insertion des administrateurs
        await Admin.insertMany(adminsData);
        console.log('Administrateurs insérés dans la base de données');
    } catch (error) {
        console.log('Erreur lors de l\'insertion des données:', error);
    }
};

// Peupler la base de données lors du démarrage
seedDatabase();

// Démarrage du serveur
app.listen(process.env.PORT, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription d'un utilisateur
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant.' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Utilisateur créé avec succès.', user });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Connexion d'un utilisateur
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(200).json({ message: 'Connexion réussie.', token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Récupérer les informations d'un utilisateur (exemple d'action réservée aux admins)
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id); // Utilisateur connecté via le token JWT
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Récupérer tous les utilisateurs (action réservée à l'admin)
const getAllUsers = async (req, res) => {
    try {
        // Vérifier que l'utilisateur est un admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Accès refusé, réservé aux administrateurs.' });
        }

        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers, // Action réservée à l'admin
};

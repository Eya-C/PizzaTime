const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Exemple de modèle d'utilisateur

// Exemple de fonction pour générer un token JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expirera dans 1 heure
    });
};

// Exemple de fonction pour l'authentification (login)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifiez si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer un token JWT pour l'utilisateur
        const token = generateToken(user._id);

        // Répondre avec le token
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { loginUser };

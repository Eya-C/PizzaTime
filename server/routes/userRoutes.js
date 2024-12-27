const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Route pour l'inscription d'un utilisateur
router.post('/register', registerUser);

// Route pour la connexion d'un utilisateur
router.post('/login', loginUser);

// Route pour obtenir le profil d'un utilisateur (protéger par authentification)
router.get('/profile', protect, getUserProfile);

module.exports = router;

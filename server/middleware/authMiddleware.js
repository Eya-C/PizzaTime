const jwt = require('jsonwebtoken');

// Middleware pour protéger les routes nécessitant une authentification
const protect = (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Non autorisé, token invalide' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Non autorisé, token manquant' });
    }
};

// Middleware pour vérifier si l'utilisateur est un administrateur
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Accès interdit, vous n\'êtes pas administrateur' });
    }
};

module.exports = { protect, admin };

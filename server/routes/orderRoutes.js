const express = require('express');
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Route pour créer une commande
router.post('/', protect, createOrder);

// Route pour obtenir toutes les commandes (accès admin)
router.get('/', protect, admin, getOrders);

// Route pour obtenir une commande par ID (accès admin)
router.get('/:id', protect, admin, getOrderById);

module.exports = router;

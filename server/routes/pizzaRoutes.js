const express = require('express');
const { getPizzas, addPizza, updatePizza, deletePizza } = require('../controllers/pizzaController');
const router = express.Router();

// Route pour obtenir toutes les pizzas
router.get('/', getPizzas);

// Route pour ajouter une nouvelle pizza
router.post('/', addPizza);

// Route pour mettre à jour une pizza
router.put('/:id', updatePizza);

// Route pour supprimer une pizza
router.delete('/:id', deletePizza);

module.exports = router;

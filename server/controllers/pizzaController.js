const Pizza = require('../models/Pizza');

// Créer une nouvelle pizza (réservé aux admins)
const createPizza = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Accès refusé, réservé aux administrateurs.' });
        }

        const { name, description, price, imageUrl } = req.body;

        const pizza = new Pizza({
            name,
            description,
            price,
            imageUrl,
        });

        await pizza.save();
        res.status(201).json({ message: 'Pizza créée avec succès', pizza });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Modifier une pizza (réservé aux admins)
const updatePizza = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Accès refusé, réservé aux administrateurs.' });
        }

        const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza non trouvée.' });
        }

        res.status(200).json({ message: 'Pizza mise à jour avec succès.', pizza });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Supprimer une pizza (réservé aux admins)
const deletePizza = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Accès refusé, réservé aux administrateurs.' });
        }

        const pizza = await Pizza.findByIdAndDelete(req.params.id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza non trouvée.' });
        }

        res.status(200).json({ message: 'Pizza supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Récupérer toutes les pizzas
const getAllPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.status(200).json(pizzas);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Récupérer une pizza par son ID
const getPizzaById = async (req, res) => {
    try {
        const pizza = await Pizza.findById(req.params.id);
        if (!pizza) {
            return res.status(404).json({ message: 'Pizza non trouvée.' });
        }
        res.status(200).json(pizza);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

module.exports = {
    createPizza,
    updatePizza,
    deletePizza,
    getAllPizzas,
    getPizzaById,
};

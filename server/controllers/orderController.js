const Order = require('../models/Order');
const Pizza = require('../models/Pizza');

// Créer une nouvelle commande
const createOrder = async (req, res) => {
    try {
        const { pizzas, totalPrice, userId, status } = req.body;

        // Vérifier que les pizzas existent dans la base de données
        const pizzaIds = pizzas.map(pizza => pizza._id);
        const pizzasInDb = await Pizza.find({ '_id': { $in: pizzaIds } });

        if (pizzasInDb.length !== pizzas.length) {
            return res.status(400).json({ message: 'Certaines pizzas n\'existent pas dans la base de données.' });
        }

        // Créer la commande
        const order = new Order({
            pizzas,
            totalPrice,
            userId,
            status,
        });

        await order.save();
        res.status(201).json({ message: 'Commande créée avec succès', order });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Récupérer toutes les commandes
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Récupérer une commande par son ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée.' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Modifier une commande (par exemple, changer son statut)
const updateOrder = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée.' });
        }

        res.status(200).json({ message: 'Commande mise à jour avec succès.', order });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

// Supprimer une commande
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée.' });
        }

        res.status(200).json({ message: 'Commande supprimée avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur du serveur.', error });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};

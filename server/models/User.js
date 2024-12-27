const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importation de bcryptjs

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Hook avant de sauvegarder un utilisateur pour hasher le mot de passe
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next(); // Si le mot de passe n'est pas modifié, on ne fait rien
    }

    try {
        const salt = await bcrypt.genSalt(10); // Générer un "salt"
        this.password = await bcrypt.hash(this.password, salt); // Hash du mot de passe
        next();
    } catch (error) {
        next(error); // Si une erreur se produit, elle est transmise à la fonction suivante
    }
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Comparer le mot de passe entré avec le hash stocké
};

module.exports = mongoose.model('User', userSchema);

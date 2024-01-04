const mongoose = require('mongoose'); // Module mongoose pour la gestion des schémas MongoDB

// Définition du schéma pour l'objet Thing dans la base de données
const thingSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, require: true },
    imageUrl: { type: String, require: true },
    userId: { type: String, require: true }, // ID de l'utilisateur associé à l'objet Thing
    price: { type: Number, require: true },
});

// Création du modèle Thing à partir du schéma, qui sera utilisé pour interagir avec la base de données
module.exports = mongoose.model('Thing', thingSchema);
const mongoose = require('mongoose'); // Module mongoose pour la gestion des schémas MongoDB
const uniqueValidator = require('mongoose-unique-validator'); // Plugin pour la validation d'unicité avec mongoose

// Définition du schéma pour l'objet User dans la base de données
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Utilisation du plugin uniqueValidator pour gérer la validation d'unicité sur le champ 'email'
userSchema.plugin(uniqueValidator);

// Création du modèle User à partir du schéma, qui sera utilisé pour interagir avec la base de données
module.exports = mongoose.model('User', userSchema);
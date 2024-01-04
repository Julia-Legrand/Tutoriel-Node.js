const express = require('express'); // Importation du framework Express
const router = express.Router(); // Création d'un objet Router pour gérer les routes
const userCtrl = require('../controllers/user'); // Importation du contrôleur pour les utilisateurs

// Définition des routes pour les opérations d'inscription et de connexion des utilisateurs

// Route pour l'inscription d'un nouvel utilisateur
router.post('/signup', userCtrl.signup);

// Route pour la connexion d'un utilisateur existant
router.post('/login', userCtrl.login);

// Exportation du Router pour utilisation dans d'autres fichiers
module.exports = router;
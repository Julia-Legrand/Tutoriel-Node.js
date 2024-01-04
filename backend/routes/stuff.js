const express = require('express'); // Importation du framework Express
const router = express.Router(); // Création d'un objet Router pour gérer les routes

const auth = require('../middleware/auth'); // Middleware d'authentification
const multer = require('../middleware/multer-config'); // Middleware pour la gestion des fichiers

const stuffCtrl = require('../controllers/stuff'); // Importation du contrôleur pour les objets "Stuff"

// Définition des routes pour les objets "Stuff" avec les méthodes correspondantes du contrôleur

// Route pour récupérer tous les objets "Stuff"
router.get('/', auth, stuffCtrl.getAllThings);

// Route pour créer un nouvel objet "Stuff"
router.post('/', auth, multer, stuffCtrl.createThing);

// Route pour récupérer un objet "Stuff" spécifique par son ID
router.get('/:id', auth, stuffCtrl.getOneThing);

// Route pour modifier un objet "Stuff" spécifique par son ID
router.put('/:id', auth, multer, stuffCtrl.modifyThing);

// Route pour supprimer un objet "Stuff" spécifique par son ID
router.delete('/:id', auth, stuffCtrl.deleteThing);

// Exportation du Router pour utilisation dans d'autres fichiers
module.exports = router;
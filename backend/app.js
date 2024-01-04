// Importation du framework Express
const express = require('express');
const app = express(); // Création de l'application Express

// Importation de Mongoose pour la connexion à MongoDB
const mongoose = require('mongoose');

// Importation du module path pour manipuler les chemins de fichiers
const path = require('path');

// Importation des routes définies pour les ressources "stuff" et les utilisateurs
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

// Importation du mot de passe depuis le fichier de configuration
const { mongoDBPassword } = require('./config');

// Utilisation du middleware intégré pour traiter les requêtes au format JSON
app.use(express.json());

// Connexion à la base de données MongoDB
mongoose.connect(`mongodb+srv://new_user:${mongoDBPassword}@cluster0.vd4oixf.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
      .then(() => console.log('Connexion à MongoDB réussie !'))
      .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware pour autoriser les requêtes CORS (Cross Origin Resource Sharing)
// La sécurité CORS permet d'empêcher l'utilisation de ressources par des origines non autorisées
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autoriser toutes les origines
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Middleware pour charger les fichiers statiques dans le répertoire 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Utilisation des routes spécifiques pour les ressources "stuff" et les utilisateurs
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Export de l'application Express
module.exports = app;
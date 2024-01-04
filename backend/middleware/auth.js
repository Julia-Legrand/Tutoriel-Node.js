const jwt = require('jsonwebtoken'); // Module pour la gestion des tokens JWT

// Middleware d'authentification par token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extraction du token depuis le header Authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Vérification et décodage du token
        const userId = decodedToken.userId; // Récupération de l'ID utilisateur depuis le token
        req.auth = {
            userId: userId
        };
        return next(); // Appel de la fonction suivante dans la chaîne middleware
    } catch (error) {
        res.status(401).json({ error }); // Retourne une erreur si la vérification du token échoue
    }
};
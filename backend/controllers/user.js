const bcrypt = require('bcrypt'); // Module pour le hachage des mots de passe
const jwt = require('jsonwebtoken'); // Module pour la gestion des tokens JWT

const User = require('../models/User'); // Importation du modèle User défini pour la base de données

// Fonction pour créer un nouvel utilisateur dans la base de données
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Hachage du mot de passe avec un coût de hachage de 10
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction pour gérer l'authentification d'un utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                // Retourne une erreur si l'utilisateur n'est pas trouvé dans la base de données
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
            } else {
                // Vérification du mot de passe en le comparant avec le hachage stocké dans la base de données
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            // Retourne une erreur si le mot de passe est incorrect
                            res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                        } else {
                            // Création d'un token JWT si l'authentification est réussie
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET', // Clé secrète pour signer le token (à remplacer par une clé sécurisée en production)
                                    { expiresIn: '24h' } // Durée de validité du token
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};
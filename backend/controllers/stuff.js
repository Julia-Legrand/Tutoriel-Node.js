const Thing = require('../models/Thing'); // Importation du modèle Thing défini pour la base de données
const fs = require('fs'); // Module File System pour manipuler les fichiers

// Fonction pour créer un nouvel objet Thing dans la base de données
exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing); // Extraction des données de l'objet Thing depuis la requête
    delete thingObject._id;
    delete thingObject._userId;

    // Création d'une nouvelle instance Thing avec les données de la requête et l'URL de l'image
    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    // Sauvegarde de l'objet Thing dans la base de données
    thing.save()
        .then(() => { res.status(201).json({ message: 'Objet enregistré' }) })
        .catch(error => { res.status(400).json({ error }) });
};

// Fonction pour modifier un objet Thing dans la base de données
exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete thingObject._userId;

    // Vérification de l'autorisation de modification pour l'utilisateur
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                // Mise à jour de l'objet Thing dans la base de données
                Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Fonction pour supprimer un objet Thing de la base de données
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non authorisé' });
            } else {
                // Suppression de l'objet Thing et du fichier image associé
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Thing.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Objet supprimé' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

// Fonction pour récupérer un objet Thing spécifique de la base de données
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

// Fonction pour récupérer tous les objets Thing de la base de données
exports.getAllThings = (req, res, next) => {
    Thing.find() // Méthode pour renvoyer un tableau contenant tous les Things dans la base de données
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};
const multer = require('multer'); // Module multer pour la gestion des fichiers téléchargés

// Types MIME acceptés pour les images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration du stockage des fichiers téléchargés avec multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // Destination où les fichiers seront enregistrés (ici dans le dossier 'images')
  },
  filename: (req, file, callback) => {
    // Génération du nom de fichier en évitant les espaces dans le nom d'origine
    const name = file.originalname.split(' ').join('_');
    // Récupération de l'extension du fichier depuis son type MIME
    const extension = MIME_TYPES[file.mimetype];
    // Construction du nom de fichier complet avec timestamp pour éviter les conflits et personnaliser le nom de l'image
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Export du middleware multer configuré pour enregistrer un seul fichier avec le nom 'image'
module.exports = multer({ storage: storage }).single('image');
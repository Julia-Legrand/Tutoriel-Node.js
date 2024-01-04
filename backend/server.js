const http = require('http'); // Module HTTP pour créer un serveur
const app = require('./app'); // Import du module d'application personnalisé
const cors = require('cors'); // Middleware CORS pour gérer les requêtes HTTP cross-origin

// Fonction de normalisation du port pour s'assurer qu'il est valide
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

// Récupération du port à partir de la variable d'environnement ou utilisation du port 3000 par défaut
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Fonction de gestion des erreurs liées au serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// Utilisation du middleware CORS pour gérer les requêtes cross-origin
app.use(cors());

// Création d'un serveur HTTP en utilisant l'application express
const server = http.createServer(app);

// Gestion des erreurs liées au serveur
server.on('error', errorHandler);

// Action à effectuer lorsque le serveur commence à écouter
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

// Configuration du serveur pour écouter sur le port spécifié
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
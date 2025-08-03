// API pour gérer les localisations
export default function handler(req, res) {
    // Cas pour la méthode POST (envoi de la position)
    if (req.method === "POST") {
        const { latitude, longitude, userId } = req.body; // Récupération de l'ID utilisateur

        if (!userId || !latitude || !longitude) {
            return res.status(400).json({ message: "Données manquantes" }); // Vérification des données
        }

        // Initialisation des positions si elles n'existent pas encore
        global.positions = global.positions || [];

        // Recherche si l'utilisateur a déjà des positions
        let userPositions = global.positions.find(position => position.userId === userId);

        if (userPositions) {
            // Si l'utilisateur a déjà des positions, on ajoute la nouvelle à son tableau
            userPositions.positions.push({ latitude, longitude });
        } else {
            // Si aucune position existante, on ajoute une nouvelle entrée pour l'utilisateur
            global.positions.push({
                userId,
                positions: [{ latitude, longitude }]
            });
        }

        // Réponse du serveur
        res.status(200).json({ message: "Position enregistrée" });
    }
    // Cas pour la méthode GET (récupération des positions)
    else if (req.method === "GET") {
        // Renvoie toutes les positions enregistrées
        res.status(200).json(global.positions || []);
    }
}
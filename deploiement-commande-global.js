/**
 * @file deploiement-commande.js
 * @description Permet de déployer les commandes sur tous les serveurs
 * @author RadYio
 * @version 1.0.0
 */

const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');
const fs = require('node:fs');

const liste_commande = [];
// Recupération de tous les fichiers dans le dossier commande
const fichiers_de_commande = fs.readdirSync('./commands').filter(fichier => fichier.endsWith('.js'));

for (const fichier of fichiers_de_commande) {
	const commande = require(`./commands/${fichier}`);
	liste_commande.push(commande.data.toJSON());
}

// Creation d'une instance de REST et configuration du token
const rest = new REST({ version: '10' }).setToken(token);


//fonction anonyme auto-executable pour deployer les commandes sur tous les serveurs
(async () => {
	try {
		console.log(`Started refreshing ${liste_commande.length} application (/) commands.`);

		// On utilise la methode put pour mettre a jour les commandes sur tous les serveurs
		const data = await rest.put(
            Routes.applicationCommands(clientId),
            { body: liste_commande },
        );

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// log les erreurs dans la console (todo)
		console.error(error);
	}
})();

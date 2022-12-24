const { Events } = require('discord.js');
const { channelId } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true, //Car on ne veut executer cette fonction qu'une seule fois au démarrage du bot
	execute(client) {
		console.log(`Connecté en tant que ${client.user.tag}!`);
        const channel = client.channels.cache.get(channelId);
        ts = new Date(client.readyTimestamp);

		//affichage propre de l'heure
		let heure = ts.getHours().toString().padStart(2, '0');
		let minutes = ts.getMinutes().toString().padStart(2, '0');
		let secondes = ts.getSeconds().toString().padStart(2, '0');

        channel.send(heure + ':' + minutes + ':' + secondes + '\t--\tLancement');
	},
};

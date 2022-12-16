const { Events } = require('discord.js');
const { channelId } = require('../config.json');

module.exports = {
	name: Events.ClientReady,
	once: true, //Car on ne veut executer cette fonction qu'une seule fois au démarrage du bot
	execute(client) {
		console.log(`Connecté en tant que ${client.user.tag}!`);
        const channel = client.channels.cache.get(channelId);
        channel.send('Hello!!');
	},
};

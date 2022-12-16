/**
 * @file index.js
 * @description Le fichier principal du bot
 * @version 0.0.2
 * @author RadYio
*/


//importation du module discord.js
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
//création d'un nouveau client discord
const client = new Client({ intents: 131027 });

//recuperation du token dans le fichier config.json
const { token, channelId, ownerId } = require('./config.json');
if (!token) {
  console.log('Veuillez remplacer le token par le votre dans le fichier config.json');
  process.exit();
}
console.log(`Token trouvé:  ${token}!`);


//importation du module fs
const fs = require('fs')



//Récupération des commandes
client.commandes = new Collection();

const fichiers_de_commande = fs.readdirSync('./commands').filter(fichier => fichier.endsWith('.js'));
for (const fichier of fichiers_de_commande) {
  const commande = require(`./commands/${fichier}`);
  client.commandes.set(commande.data.name, commande);
}

//Récupération des events
const fichiers_de_event = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const fichier of fichiers_de_event) {
	const event = require(`./events/${fichier}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}





client.on('disconnect', message => {
  const channel = client.channels.cache.get(channelId);
  channel.send('Je pars avec toutes les fesses! Bye les boloss');
});


//connexion du client bot
client.login(token);

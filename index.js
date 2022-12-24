/**
 * @file index.js
 * @description Le fichier principal du bot
 * @version 0.1.0
 * @author RadYio
*/

//importation du module fs
const fs = require('fs');
//importation du module discord.js
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
//création d'un nouveau client discord
const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.MessageContent,
] });





//recuperation du token dans le fichier config.json
const { token, channelId } = require('./config.json');
if (!token) {
  console.log('Veuillez remplacer le token par le votre dans le fichier config.json');
  process.exit();
}
console.log(`Token trouvé:  ${token}!`);




//Récupération des commandes
client.commandes = new Collection();

const fichiers_de_commande = fs.readdirSync('./commandes').filter(fichier => fichier.endsWith('.js'));
for (const fichier of fichiers_de_commande) {
  const commande = require(`./commandes/${fichier}`);
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

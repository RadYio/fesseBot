/**
 * @file index.js
 * @description Le fichier principal du bot
 * @version 0.0.2
 * @author RadYio
 */

// ****************************
// ** CHOIX DU MODE DE DEBUG **
// ****************************
const debug = true;

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

//on va peut etre tej la suite 
if (debug) console.log(`Token trouvé:  ${token}!`);
else console.log("Token trouvé: ".concat("*".repeat(token.length)));


//importation du module fs
const fs = require('fs')



//Récupération des commandes
client.commandes = new Collection();

const fichiers_de_commande = fs.readdirSync('./commands').filter(fichier => fichier.endsWith('.js'));
for (const fichier of fichiers_de_commande) {
  const commande = require(`./commands/${fichier}`);
  client.commandes.set(commande.data.name, commande);
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

  //On recupere le nom de la commande 
  const commande = interaction.client.commandes.get(interaction.commandName);
  //verification que la commande existe
	if (!commande) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

  //On execute la commande
	try {
		await commande.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//quand le client est prêt:
client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
    const channel = client.channels.cache.get(channelId);
    channel.send('Hello!!');
});


//quand le client reçoit un message:
client.on('messageCreate', msg => {
  if( debug ) console.log(`Message de {${msg.author.username}}: ${msg.content}`);

  //On ajoute un pouce à tous les messages qui contienne le mot ratio
  if (msg.content.toLocaleLowerCase().includes('ratio')) msg.react('👍');

  //Le but originel de ce bot
  if (msg.content.toLocaleLowerCase().includes('fesse')) {
    if (msg.author.id === ownerId){
      msg.reply('https://instagram.frns1-1.fna.fbcdn.net/v/t51.2885-15/300599829_1708577599520104_4659010997660154779_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.frns1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=dD-qu7FDnE0AX8FDd6R&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MjkxMTI3MzM2MDAzODY1OTg3NQ%3D%3D.2-ccb7-5&oh=00_AfBmcwaEt3G4uJqZFSnaZLA1NOCBcPnbmgpDY5B-zf7bZA&oe=63A02F54&_nc_sid=6136e7');
    }else if(msg.author.id === '281571816848228352'){ //alexis
      msg.react('🏳️‍🌈');
      msg.reply('https://cdn.discordapp.com/attachments/798534870301016074/1053085054219337778/unknown.png')
    }else{
      msg.react(msg.guild.emojis.cache.find(emoji => emoji.name === 'gronin'));
    }
  }
  



  //Si c'est arthur qu'il parle on le ratio (mérité)
  //if (msg.author.id === '353648597671215105') msg.reply('Ratio');

  //if (debug) console.log(msg.author);


  //On regarde si le bot est mentionné
  if(msg.mentions.users.has(client.user.id)){

    if( debug ) console.log(msg.mentions.users);

    //On fait les tests sur le messages
    if(msg.content.toLocaleLowerCase().includes('bonjour')){
      msg.react('🇧');
      msg.react('🇴');
      msg.react('🇳');
      msg.react('🇯');
      msg.react('🅾️');
      msg.react('🇺');
      msg.react('🇷');
    }
  }
});

client.on('disconnect', message => {
  const channel = client.channels.cache.get(channelId);
  channel.send('Je pars avec toutes les fesses!');
});


//connexion du client bot
client.login(token);

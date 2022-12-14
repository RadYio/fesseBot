//importation du module discord.js
const Discord = require('discord.js');

//création d'un nouveau client discord
const client = new Discord.Client({ intents: 1 })

//Récupération du token dans le fichier
const fs = require('fs')
const token = fs.readFileSync('token.token', 'utf8')
console.log(`Token trouvé:  ${token}!`);

//quand le client est prêt:
client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
    const channel = client.channels.cache.get('892842167226208328');
    channel.send('Je suis connecté!');
});


//quand le client reçoit un message:
client.on('message', msg => {
  console.log(`je recois un message: ${msg.content}!\n`);
  
  if (msg.content === 'fesse') {
    msg.reply('fesse');
  }
});

client.on('disconnect', message => {
  const channel = client.channels.cache.get('892842167226208328');
  channel.send('Je suis pars!');
});


//connexion du client bot
client.login(token);

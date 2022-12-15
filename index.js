//importation du module discord.js
const Discord = require('discord.js');

//création d'un nouveau client discord
const client = new Discord.Client({ intents: 131027 });

//On active le mode debug
const debug = false;

//Récupération du token dans le fichier
const fs = require('fs')
const token = fs.readFileSync('token.token', 'utf8')
console.log(`Token trouvé:  ${token}!`);

//id du salon qui recevra les messages de test
const id_salon_test = '280773885287333888'; //bsl 


//quand le client est prêt:
client.on('ready', () => {
    console.log(`Connecté en tant que ${client.user.tag}!`);
    const channel = client.channels.cache.get(id_salon_test);
    channel.send('Hello!!');
});


//quand le client reçoit un message:
client.on('messageCreate', msg => {
  if( debug ) console.log(`Message de {${msg.author.username}}: ${msg.content}`);

  //On ajoute un pouce à tous les messages qui contienne le mot ratio
  if (msg.content.toLocaleLowerCase().includes('ratio')) {
    msg.react('👍');
  }

  //Si c'est arthur qu'il parle on le ratio (mérité)
  if (msg.author.id === '353648597671215105'){
    msg.reply('Ratio');
  }

  if (debug) console.log(msg.author);


  //On verifie que le message est destiné au bot
  if(msg.mentions.users.first() === client.user){
    //On transforme en le message pour ne garder que le contenu sans la mention
    texte = msg.content.substring(client.user.id.length+4)

    if( debug ) console.log(texte);

    //On fait les tests sur le messages
    if(texte.toLowerCase() === 'bonjour'){
      msg.reply('Bonjour !');
    }
  }
});

client.on('disconnect', message => {
  const channel = client.channels.cache.get(id_salon_test);
  channel.send('Je pars avec toutes les fesses!');
});


//connexion du client bot
client.login(token);

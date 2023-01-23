const { Events } = require('discord.js');
const { ownerId } = require('../config.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        //On ajoute un pouce à tous les messages qui contienne le mot ratio
        msg = interaction;
        if (interaction.content.toLocaleLowerCase().includes('ratio')) msg.react('👍');
	
	//On va se marrer et répondre feur
	if (interaction.content.toLocaleLowerCase().includes('quoi'))  interaction.reply('feur je crois');
	if (interaction.content.toLocaleLowerCase().includes('QUOI'))  interaction.reply('FEUR');
        //Le but originel de ce bot
        if (interaction.content.toLocaleLowerCase().includes('fesse')) {
            if (interaction.author.id === ownerId){
                interaction.reply({content: 'https://media2.giphy.com/media/6D0dubMvJUtAA/giphy.gif?cid=790b761164b740deaf6eeb7b9de91d5e426b5c582d244c26&rid=giphy.gif&ct=g', spoiler: true});
            }else if(interaction.author.id === '281571816848228352'){ //alexis
                interaction.react('🏳️‍🌈');
                interaction.reply({files: "./image/alexispic.png", spoiler: true});
            }else{
                interaction.react(interaction.guild.emojis.cache.find(emoji => emoji.name === 'gronin'));
            }
        }

        //Si c'est arthur qui parle on le ratio (mérité)
        if (interaction.author.id === '353648597671215105') interaction.reply('Merci Dieu');

        //On regarde si le bot est mentionné
        if(interaction.mentions.users.has(interaction.client.user.id)){

            //On fait les tests sur le messages
            if(interaction.content.toLocaleLowerCase().includes('bonjour')){
                interaction.react('🇧');
                interaction.react('🇴');
                interaction.react('🇳');
                interaction.react('🇯');
                interaction.react('🅾️');
                interaction.react('🇺');
                interaction.react('🇷');
            }
        }
	},
};

const { Events } = require('discord.js');
const { ownerId } = require('../config.json');

module.exports = {
	name: Events.MessageCreate,
	async execute(interaction) {
        //On ajoute un pouce à tous les messages qui contienne le mot ratio
        msg = interaction;
        if (interaction.content.toLocaleLowerCase().includes('ratio')) msg.react('👍');

        //Le but originel de ce bot
        if (interaction.content.toLocaleLowerCase().includes('fesse')) {
            if (interaction.author.id === ownerId){
                interaction.reply('https://instagram.frns1-1.fna.fbcdn.net/v/t51.2885-15/300599829_1708577599520104_4659010997660154779_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.frns1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=dD-qu7FDnE0AX8FDd6R&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MjkxMTI3MzM2MDAzODY1OTg3NQ%3D%3D.2-ccb7-5&oh=00_AfBmcwaEt3G4uJqZFSnaZLA1NOCBcPnbmgpDY5B-zf7bZA&oe=63A02F54&_nc_sid=6136e7');
            }else if(interaction.author.id === '281571816848228352'){ //alexis
                interaction.react('🏳️‍🌈');
                interaction.reply('||test||', {files: "./image/alexispic.png"});
            }else{
                interaction.react(interaction.guild.emojis.cache.find(emoji => emoji.name === 'gronin'));
            }
        }

        //Si c'est arthur qui parle on le ratio (mérité)
        //if (interaction.author.id === '353648597671215105') interaction.reply('Ratio');

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
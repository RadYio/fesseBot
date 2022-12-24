const { SlashCommandBuilder } = require('discord.js');
const { ownerId } = require('../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('fin')
		.setDescription('arrete l\'éxécution du bot'),
	async execute(interaction) {
		//console.log(interaction.user.id + ' a utilisé la commande /fin');
        await interaction.deferReply({ephemeral: true});
        setTimeout(() => {interaction.deleteReply()}, 5000);

        //Seul le propriétaire du bot peut l'arrêter
        if (interaction.user.id !== ownerId) return await interaction.editReply({content: 'Seul le propriétaire du bot peut l\'arrêter', ephemeral: true});
        await interaction.editReply({content: 'Arret du bot...', ephemeral: true});
        await interaction.client.destroy();
	},
};



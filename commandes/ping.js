const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('donne son temps de réponse en ms'),
	async execute(interaction) {
		//On pourrait utiliser deferReply, mais le bot est sensé repondre instantanément donc on garde reply
		//await interaction.deferReply({ephemeral: true});
		await interaction.reply({content: 'Je regarde...', ephemeral: true});
		await interaction.editReply( {content: (interaction.client.ws.ping) + "ms", ephemeral: true});
		await setTimeout(() => {interaction.deleteReply()}, 5000);
		
	},
};



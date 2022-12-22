const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('donne son temps de réponse en ms'),
	async execute(interaction) {
		await interaction.reply({content: 'je regarde..', ephemeral: true}).then(async () => {
			await interaction.editReply( {content: (interaction.client.ws.ping) + "ms", ephemeral: true});
		});
	},
};



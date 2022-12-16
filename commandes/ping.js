const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('donne son temps de réponse en ms'),
	async execute(interaction) {
		await interaction.reply('je regarde..').then(async () => {
			await interaction.editReply((interaction.client.ws.ping) + "ms");
		});
	},
};



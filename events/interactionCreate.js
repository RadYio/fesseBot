const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()){
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
				setTimeout(() => {interaction.deleteReply()}, 30000);
			}
			return;
		}
			
	},
};
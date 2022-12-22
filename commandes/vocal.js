const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vocal')
		.setDescription('[beta] crée un salon vocal et le bot rejoint ce salon'),
	async execute(interaction) {
        await interaction.deferReply({ephemeral: true});
        const nom_salon = 'fesseBot -- ' + interaction.user.username;
		const salon = await interaction.guild.channels.create({
            name: nom_salon,
            type: ChannelType.GuildVoice,
            permissionOverwrites: [
                {
                id: interaction.user.id,
                deny: [PermissionFlagsBits.ViewChannel],
                },
            ],
        });
        
        await interaction.editReply({content: 'Salon vocal créé', ephemeral: true});
        const connection = joinVoiceChannel({
            channelId: interaction.guild.channels.cache.find(channel => channel.name === nom_salon).id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        }); 

        setTimeout(() => {interaction.deleteReply()}, 5000);
        

	},
};



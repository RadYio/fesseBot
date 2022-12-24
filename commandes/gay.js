const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { ownerId } = require('../config.json');

const delai = 15000; //15 secondes

const Sequelize = require('sequelize');
const BDD = new Sequelize('bddgay', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'bddgay.sqlite',
  });

const Gays = BDD.define('Gays', {
  gayId: {
    type: Sequelize.INTEGER,
    unique: true,
  },
  gayNom: Sequelize.STRING,
  gayPuissance: Sequelize.INTEGER,

});
Gays.sync();



module.exports = {
	data: new SlashCommandBuilder()
		.setName('gay')
		.setDescription('Mise à jour en temps réel de la bddgay')
        .addUserOption(option => option.setName('user').setDescription('Utilisateur à mettre à jour').setRequired(true)),

	async execute(interaction) {
		//await interaction.deferReply({ephemeral: true});
        const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('ajouter')
					.setLabel('Ajouter')
					.setStyle(ButtonStyle.Primary),
			).addComponents(
                new ButtonBuilder()
                    .setCustomId('retirer')
                    .setLabel('Retirer')
                    .setStyle(ButtonStyle.Secondary),
            )

            if(interaction.user.id === ownerId){ 
            row.addComponents(
                new ButtonBuilder()
                    .setCustomId('reset')
                    .setLabel('Remise à 0')
                    .setStyle(ButtonStyle.Success),
            );
            }else{
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId('reset')
                        .setLabel('Remise à 0')
                        .setStyle(ButtonStyle.Danger)
                        .setDisabled(true), 
                );
            }

        await interaction.reply({content: 'Recherche dans la base de données', ephemeral: true});
        const user = await Gays.findOne({ where: { gayId: interaction.options.getUser('user').id } });
        if(!user){
            const nouveauGay = await Gays.create({
                gayId: interaction.options.getUser('user').id,
                gayPuissance: 0, 
                gayNom: interaction.options.getUser('user').username 
            });
            
        }else{
            //On met à jour le pseudo de l'utilisateur dans la base de données
            user.update({gayNom: interaction.options.getUser('user').username})
        }
        //On affiche le score gay + les choix
        await interaction.editReply({content: user.gayNom + ' a ' + user.gayPuissance + ' points gay', components: [row], ephemeral: true});
        
        //Fin de la création du bouton


        


        


        //Détection du bouton
        const filter = i => i.customId === 'ajouter' || i.customId === 'retirer' || i.customId === 'reset';
		const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1, time: delai + 1000});
        
        collector.on('collect', async i => {
            await i.deferUpdate();
            
            if (i.customId === 'ajouter')   user.increment('gayPuissance');
            if (i.customId === 'retirer')   user.decrement('gayPuissance');
            if (i.customId === 'reset')     user.update({gayPuissance: 0});
            await i.editReply({content: 'Base de données mise à jour', components: [], ephemeral: true})
        });

        collector.on('end', collected => {
            console.log(`Récupération de ${collected.size} interactions.`);
        });
        setTimeout(() => {interaction.deleteReply()}, delai);

	},
};



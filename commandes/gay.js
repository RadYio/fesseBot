const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder } = require('discord.js');
const { ownerId } = require('../config.json');
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');

const delai = 15000; //15 secondes

//afin d'adapter la taille du texte avec le canvas
const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');
	let fontSize = 70;

	do {
		context.font = `${fontSize -= 10}px sans-serif`;
	} while (context.measureText(text).width > canvas.width - 300);

	return context.font;
};


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
		console.log(interaction.user.username + ' --> ' + interaction.options.getUser('user').username);
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
        let leGay = await Gays.findOne({ where: { gayId: interaction.options.getUser('user').id } });
        if(!leGay){
            const nouveauGay = await Gays.create({
                gayId: interaction.options.getUser('user').id,
                gayPuissance: 0, 
                gayNom: interaction.options.getUser('user').username 
            });
            leGay = await Gays.findOne({ where: { gayId: interaction.options.getUser('user').id } });
        }else{
            //On met à jour le pseudo de l'utilisateur dans la base de données
            leGay.update({gayNom: interaction.options.getUser('user').username})
        }
        interaction.editReply({content: 'Recherche dans la base de données.', ephemeral: true})
        
        const canvas = Canvas.createCanvas(700, 250);
		const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('./image/fond.jpg');
        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        interaction.editReply({content: 'Recherche dans la base de données..', ephemeral: true})

        const logobdd = await Canvas.loadImage('./image/logobdd.png');
	    context.drawImage(logobdd, canvas.width-200, canvas.height-80, 195, 80);

        interaction.editReply({content: 'Recherche dans la base de données...', ephemeral: true})

        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.font = applyText(canvas, interaction.options.getUser('user').username);
	    context.fillStyle = '#ffffff';
	    context.fillText(interaction.options.getUser('user').username, canvas.width / 2.5, canvas.height / 2.8);

        interaction.editReply({content: 'Recherche dans la base de données.', ephemeral: true})

        context.fillStyle = '#bb3093';
        context.font = applyText(canvas, leGay.gayPuissance + ' points');
        context.fillText(leGay.gayPuissance + ' points', canvas.width / 2.5, canvas.height / 1.5);

        interaction.editReply({content: 'Recherche dans la base de données..', ephemeral: true})
        
        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
	    context.clip();

        const { body } = await request(interaction.options.getUser('user').displayAvatarURL({extension: 'png'}));
        const avatar = await Canvas.loadImage(await body.arrayBuffer());
        
        context.drawImage(avatar, 25, 25, 200, 200);

        interaction.editReply({content: 'Recherche dans la base de données...', ephemeral: true})

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
        interaction.editReply({content: '', files: [attachment], components: [row] });
        //Fin de la création du bouton



        


        //Détection du bouton
        const filter = i => i.customId === 'ajouter' || i.customId === 'retirer' || i.customId === 'reset';
		const collector = interaction.channel.createMessageComponentCollector({ filter, max: 10, time: delai + 1000});
        
        collector.on('collect', async i => {
            await i.deferUpdate();
            
            if (i.customId === 'ajouter')   leGay.increment('gayPuissance');
            if (i.customId === 'retirer')   leGay.decrement('gayPuissance');
            if (i.customId === 'reset')     leGay.update({gayPuissance: 0});
            await i.editReply({content: 'Base de données mise à jour', components: [], ephemeral: true})
        });

        //collector.on('end', collected => {
        //    console.log(`Récupération de ${collected.size} interactions.`);
        //});
        setTimeout(() => {interaction.deleteReply()}, delai);

	},
};



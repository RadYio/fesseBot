const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login('Nzg4MDYxNDY1MjAyNTI0MTYx.Gl6w4n.0ty5hN3fEM4j1z7jjjCMVc-MrgE_FhGnGfQR44');



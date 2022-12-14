const Discord = require('discord.js');

const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

bot.on('ready', () => {
    bot.log(`Connecté en tant que ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

bot.login('Nzg4MDYxNDY1MjAyNTI0MTYx.Gl6w4n.0ty5hN3fEM4j1z7jjjCMVc-MrgE_FhGnGfQR44');



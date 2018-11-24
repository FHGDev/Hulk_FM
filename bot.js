const discord = require('discord.js')
const bot = new discord.RichEmbed()
bot.prefix = "h:"
bot.base = bot.guilds.get('516022273069809675')
bot.ytkey = process.env.yt_key
bot.config = require('./config.js')

bot.on('ready', () => {

})

bot.on('message', message => {
  const args = message.content.split(" ").slice(1);
  const logcmd = message.content.split(" ").slice(bot.prefix.length)
  
  if (message.content.startsWith(`${bot.prefix}join`)) {
    const vc = message.member.voiceChannel
    if (!vc) return message.channel.send("Join a voice channel first.");
    
  }
})

bot.login(process.env.token)

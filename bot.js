const discord = require('discord.js')
const bot = new discord.Client()
bot.settings = new discord.Collection()
bot.settings.set("prefix", "h:")
bot.settings.set('ytkey', process.env.yt_key)
bot.settings.set("config", require('./config.js'))
bot.settings.set("token", process.env.token)
bot.settings.set("dl", require('ytdl-core'))

bot.on('ready', () => {
  console.log("HulkFM Ready!")
  bot.user.setActivity(`Loading HulkFM...`, {type: "STREAMING", url: "https://twitch.tv/freakinghulk"})
  setTimeout(() => {
    bot.user.setActivity(`for h:help | ${bot.guilds.size} servers.`, {type: "WATCHING"})
  }, 10000)
})

bot.on('message', message => {
  const args = message.content.split(" ").slice(1);
  const logcmd = message.content.split(" ").slice(bot.settings.get("prefix").length)
  
  if (message.content.startsWith(`${bot.settings.get("prefix")}join`)) {
    const vc = message.member.voiceChannel
    if (!vc) return message.channel.send("Join a voice channel first.")
    
    const songs = bot.settings.get('config').songs
    const chosensong = songs[Math.floor(Math.random() * songs.length)]
    
    vc.join().then(connection => {
      chooseSong((song) => {
        connection.playStream(require('ytdl-core')(song.url))
        bot.user.setActivity(`${song.name} by ${song.artist} | h:help`, {type: "PLAYING"})
      })
      const dispatcher = connection.dispatcher
      dispatcher.on('end', () => {
        chooseSong((song) => {
           connection.playStream(require('ytdl-core')(song.url))
           bot.user.setActivity(`${song.name} by ${song.artist}`, {type: "PLAYING"})
        })
      })
    })
  }
})

function chooseSong(cb) {
  const songs = bot.settings.get('config').songs
  const randomsong = songs[Math.floor(Math.random() * songs.length)]
  
  return cb(randomsong)
}

bot.login(bot.settings.get("token"))

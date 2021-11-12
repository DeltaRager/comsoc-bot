const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Bot is up")
})

client.login(process.env.TOKEN)
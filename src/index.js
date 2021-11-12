const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const prefix = '$'

//require('./modules/RegisterMember')

client.on('ready', () => {
    console.log("Bot is up")
})

client.login(process.env.TOKEN)
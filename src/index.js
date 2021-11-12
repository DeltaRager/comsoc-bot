const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

const prefix = '$'

//require('./modules/RegisterMember')

client.once('ready', () => {
	console.log('Bot is up');
});

client.on('mess', message => {
    console.log(message.channel.type)
})

client.on('messageCreate', message => {
    console.log(message)
})

client.login(process.env.TOKEN)
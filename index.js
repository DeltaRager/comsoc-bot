const { Client, Intents } = require('discord.js');
const fs = require('fs');


const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_PRESENCES],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER']
});

const prefix = '$'

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
//require('./modules/RegisterMember')

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name,async (...args) => event.execute(...args));
	} else {
		client.on(event.name,async (...args) => event.execute(...args, prefix, client));
	}
}
console.log("Does this run?")
client.login(process.env.TOKEN)
const fs = require('fs');
const modules = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

module.exports = {
    name: 'messageCreate',
    execute(message, prefix, client) {
        if(message.channel.id === process.env.listeningChannelId)
        {
            var announceChannel = client.channels.cache.get(process.env.announcementChannelId)
            announceChannel.send(message.content)
            return
        }
        const contents = message.content.split(prefix)[1]
        if(contents)
        {
            const command =  `${contents.split(' ')[0]}.js`
            const args = contents.split(' ').splice(1,contents.length + 1)
    
            if(modules.find(cmd => cmd === command)){
                const cmdcall = require(`../commands/${command}`)
                cmdcall.execute(message, args, client)
            }
        }
    }
}
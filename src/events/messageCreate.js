const fs = require('fs');
const schema = require('../constants/mongoSchema')

module.exports = {
    name: 'messageCreate',
    execute(message, prefix, client) {
        if(message.channel.id === process.env.listeningChannelId)
        {
            new schema({
                Author: message.Author.username,
                Message: message.content,
                Timestamp: message.createdAt
            }).save()
        }
    }
}
const mongoose = require('mongoose')

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        await mongoose.connect(
            process.env.MDBSRV,
            {
                keepAlive: true
            }
        )
        console.log('Bot is up!');
    }
}
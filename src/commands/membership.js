var fs = require("fs");
const { emit } = require("process");
const readline = require('readline');

const serverid = '838035295068094474';

module.exports = {
    name: 'membership',
    execute(message, args, client) {
        if(message.channel.type == 'DM')
        {   
            if(args.length == 0){
                message.channel.send("Membership ID **not provided!**");
                return;
            }
            var flag = false;
            const readInterface = readline.createInterface({
                input: fs.createReadStream('data/membershipids.txt'),
                console: false
            });
            function checkid(id){
                if(id===args[0]){
                    flag = true;
                    readInterface.emit("found", id)
                    readInterface.pause()
                }
            }
            readInterface.on('line', function(line) {
                checkid(line)
            });
            readInterface.on('found', (id) => {
                let rawdata = fs.readFileSync('./discordmembers.json');
                var discordmembers
                if(Object.keys(rawdata).length == 0){
                    discordmembers = {};
                }else{
                    discordmembers = JSON.parse(rawdata);
                }
                if(discordmembers[id]){
                    message.channel.send(`Member with IEEE Membership ID **${id}** already exists.`);
                }else{
                    discordmembers[id] = message.author.id;
                    discordmembers = JSON.stringify(discordmembers, null, 4);
                    fs.writeFileSync('./discordmembers.json', discordmembers);

                    
                    let server = client.guilds.cache.get(serverid);
                    let member = server.members.cache.get(message.author.id)
                    let role = server.roles.cache.find(role => role.name === "member");
                    member.roles.add(role);
                    message.channel.send(`You have been assigned the member role. Go to roles-assignment channel on the discord server to select your Squad and Interests.`);
                }
            })
            readInterface.on('close', () => {
               if(!flag){
                message.channel.send('IEEE Membership ID **incorrect.**');
               }
            })
        }
    }
}
const path = require('path');
const fs = require('fs');

const auth = require('./auth');

const Embed = require('../../../src/api/embed');

module.exports = {
    name: 'authorize',
    description: 'Authorizes a user for dev commands',
    usage: '[user] [otp]',
    async run (message, args) {
        if (!auth(message, args)) {
            return message.channel.send(Embed.error('Unauthorized to run dev commands'));
        }

        if (args.length < 2) {
            return message.channel.send(Embed.error('Missing arguments'));
        }

        let id;
        if (message.mentions.members.first()) {
            id = message.mentions.members.first().id;
        }
        else if (!isNaN(args[0]) && !isNaN(parseFloat(args[0]))) {
            id = args[0];
        }
        else return message.channel.send(Embed.error('Invalid user ' + args[0]));

        const config = require('../config.json');

        config.administrators.push(id);

        fs.writeFileSync(path.join(__dirname, '..', 'config.json'), JSON.stringify(config));

        message.channel.send(new Embed('Authorized'));
    }
}

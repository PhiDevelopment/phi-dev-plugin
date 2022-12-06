const auth = require('../auth');

const Embed = require('../../../../src/api/embed');

module.exports = {
    name: 'ip',
    description: 'Obtain current public IP address of the bot.',
    usage: '[otp]',
    async run (message, args) {
        if (!auth(message, args)) {
            return message.channel.send(Embed.error('Unauthorized to run dev commands'));
        }

        const res = await fetch('https://ifconfig.me/ip');

        if (res.status != 200) {
            return message.channel.send(Embed.error('Unable to connect to ifconfig.me (' + res.status + ')'));
        }

        const ip = await res.text();

        message.channel.send(new Embed(ip));
    }
}

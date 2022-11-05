const child_process = require('child_process');

const phi = require('../../../main');
const auth = require('./auth');

const Embed = require('../../../src/api/embed');

module.exports = {
    name: 'ip',
    description: 'Obtain current IP address of the bot.',
    usage: '',
    run (message, args) {
        if (!auth(message)) {
            return message.channel.send(Embed.error('Unauthorized to run dev commands'));
        }

        child_process.exec('curl https://ifconfig.me/ip', (error, stdout, stderr) => {
            if (error) {
                phi.logger.error('curl: ' + error);
            }
            message.channel.send(new Embed(stdout));
        });
    }
}

const qrcode = require('qrcode');

const auth = require('../auth');

const config = require('../../config.json');

const Embed = require('../../../../src/api/embed');

module.exports = {
    name: 'qr',
    description: 'Generates QR code for current 2FA secret.',
    usage: '[otp]',
    async run (message, args) {
        if (!auth(message, args)) {
            return message.channel.send(Embed.error('Unauthorized to run dev commands'));
        }

        qrcode.toString(config.secret.otpauth_url, (err, str) => {
            if (err) throw err;
            message.channel.send(new Embed('```'+str+'```'));
        });
    }
}

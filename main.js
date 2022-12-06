const authorize = require('./src/commands/authorize');
const neofetch = require('./src/commands/neofetch');
const ip = require('./src/commands/ip');
const qr = require('./src/commands/qr');

try {
    const config = require('./config.json');
    if (config.secret == undefined) throw '';
} catch (e) {
    require('./src/generate');
}

module.exports = {
    commands: [
        neofetch, ip, qr, authorize
    ]
}
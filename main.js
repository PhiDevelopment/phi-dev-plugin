const authorize = require('./src/authorize');
const neofetch = require('./src/neofetch');
const ip = require('./src/ip');
const qr = require('./src/qr');

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
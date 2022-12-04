const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');

let config;
try {
    config = require('../config.json');
} catch (e) {
    config = {};
}

const secret = speakeasy.generateSecret({name: 'Phi'});

qrcode.toString(secret.otpauth_url, (err, str) => {
    if (err) throw err;
    console.log(str);
});

config.secret = secret;

fs.writeFileSync(path.join(__dirname, '..', 'config.json'), JSON.stringify(config));
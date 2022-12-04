const speakeasy = require('speakeasy');

const config = require('../config.json');

module.exports = (message, args) => {
	if (!config.administrators.includes(message.author.id)) {
		return false;
	}

	if (args.length < 1) {
		return false;
	}

	const otp = args[args.length - 1];
	
	const verified = speakeasy.totp.verify({
		secret: config.secret.ascii,
		encoding: 'ascii',
		token: otp
	});

	return verified;
}
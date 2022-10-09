const config = require('../config.json');

module.exports = (message) => {
	if (message.author.id == config.id) return true;
	return false;
}
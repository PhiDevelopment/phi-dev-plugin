const crypto = require('crypto');
const os = require('os');

const auth = require('../auth')

const phi = require('../../../../main');
const Embed = require('../../../../src/api/embed');

const icon = `
   ▄███████▄    ▄█    █▄     ▄█   
  ███    ███   ███    ███   ███   
  ███    ███   ███    ███   ███▌  
  ███    ███  ▄███▄▄▄▄███▄▄ ███▌  
▀█████████▀  ▀▀███▀▀▀▀███▀  ███▌  
  ███          ███    ███   ███   
  ███          ███    ███   ███   
 ▄████▀        ███    █▀    █▀    
`;

module.exports = {
    name: 'neofetch',
    description: 'Get list of commands',
    usage: '[otp]',
    run (message, args) {
        if (!auth(message, args)) return message.channel.send(Embed.error('Unauthorized to run dev commands'));
        
        const data = [];

        // username@hostname
        data.push(os.userInfo().username + '@' + os.hostname);
        
        // ----------------
        let dashes = '';
        for (let i = 0; i < data[0].length; i++) dashes += '-';
        data.push(dashes);

        // Instance: C8A723
        data.push('Instance: ' + phi.instance);

        // Uptime: 2 hours
        let uptime = process.uptime();
        
        let units = ["seconds", "minutes", "hours", "days"];
        let values = [60, 60, 24];

        let value = 0;

        while (uptime > values[value] && value < values.length) {
            uptime /= values[value];
            value++;
        }

        let unit = units[value];
        uptime = Math.floor(uptime);
        if (uptime == 1) unit = unit.substring(0, unit.length -1);

        data.push('Uptime: ' + uptime + ' ' + unit);

        // OS: ArchLinux
        let platform = os.platform();

        if (platform == "win32") platform = "Windows";

        data.push('OS: ' + platform + " " + os.release());

        // Home: B293A4
        let unhashed = process.cwd() + data[4] + process.env.NUMBER_OF_PROCESSORS + process.env.PROCESSOR_ARCHITECTURE + process.env.PROCESSOR_IDENTIFIER + process.env.PROCESSOR_LEVEL + process.env.PROCESSOR_REVISION;
        let hash = crypto.createHash('md5').update(unhashed).digest('hex').toUpperCase();
        let subhash = hash.slice(hash.length - 6);

        data.push('Home: ' + subhash);

        // Version: 1.0.0
        data.push('Version: ' + require('../../../../package.json').version);

        // // Shell: /bin/bash
        // data.push('Shell: ' + os.userInfo().shell);

        // // CPU: Intel Core i5 @ 4 GHz
        // data.push('CPU: ' + os.cpus()[0].model);

        // Memory: 100 MB / 15 GB
        data.push('Memory: ' + Math.floor((os.totalmem()-os.freemem())/1000000) + 'MB / ' + Math.floor(os.totalmem()/1000000) + 'MB');


        const arr = icon.split('\n');

        for (let i = 0; i < data.length; i++) {
            arr[i+1] += data[i];
        }

        const final = arr.join('\n');

        message.channel.send("```" + final + "```");
    }
}

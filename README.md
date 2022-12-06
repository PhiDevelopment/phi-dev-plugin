# Phi Development Plugin

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Phi is a modular discord bot coded in JavaScript. The Development plugin allows for easier control of the bot and parent system by a bot administrator.

## Commands

For security reasons, all plugin commands must be sent by an authorized discord account with a OTP password as the final argument.

* `neofetch`: Gives the administrator information on the instance of Phi which is running
* `authorize`: Authorize a discord account as a valid administrator
* `ip`: Returns public ip address of the network Phi is connected to
* `qr`: Returns a QR code that can be used to set up 2FA

## Configuration

In order for the plugin to function, a `config.json` is automatically created. This file may be edited manualy, or with scripts and commands. The following object displays structure of the configuration:  

```json
{
    "administrators": [],
    "secret": {}
}
```

* `administrators`: An array containing the Discord IDs of Phi's authorized administrators.
* `secret`: Object containing secret used for authorizing commands. Run `src/generate.js` to generate a new secret and invalidate the old one.

## Usage

* Place the plugin folder into the `./plugins` directory of Phi's main directory.

## Todo

* CLI input for the administrator (any commands are auto authorized).
* Extend how long it takes for an OTP to expire.

## Contributors

* [Arisien](https://github.com/Arisien) - Main developer

## License
Phi Development Plugin is licensed under the [MIT](LICENSE) license. Feel free to fork the repository or modify the code as you see fit.
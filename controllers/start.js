'use strict';

const Telegram = require('telegram-node-bot');

class StartController extends Telegram.TelegramBaseController {
    startHandler($) {
    	const name = $._message._from._firstName;
    	$.sendMessage(`Hello ${name}, Welcome to Releaf!`);   	
    }

    get routes() {
        return {
            'startCommand': 'startHandler'
        };
    }
}

module.exports = StartController;
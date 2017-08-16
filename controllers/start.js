'use strict';

const Telegram = require('telegram-node-bot');

class StartController extends Telegram.TelegramBaseController {
    startHandler($) {
    	const name = $._message._from._firstName;
    	// $.sendMessage(`Hello ${name}, Welcome to Releaf!\nType:\n*/register* to register on Releaf\n*/salerequest* to sell a commodity\n*/verify* to verify your account`, { parse_mode: 'Markdown' });   	

    	$.sendMessage(`Hello ${name}, Welcome to Releaf!\nType:\n*/register* to register on Releaf`, { parse_mode: 'Markdown' });   	
    }

    get routes() {
        return {
            'startCommand': 'startHandler'
        };
    }
}

module.exports = StartController;
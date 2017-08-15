'use strict';

const Telegram = require('telegram-node-bot');

class OtherwiseController extends Telegram.TelegramBaseController {
    handle($) {
        $.sendMessage('Sorry, I don\'t understand. I\'m only a bot afterall :)');
    }
}

module.exports = OtherwiseController;
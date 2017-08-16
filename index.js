'use strict';

const Telegram = require('telegram-node-bot'),
    config = require('./config/config'),
    tg = new Telegram.Telegram(config.TELEGRAM_BOT_TOKEN);

const FormController = require('./controllers/form')
    , StartController = require('./controllers/start')
    , OtherwiseController = require('./controllers/otherwise');

const startCtrl = new StartController()
    , formCtrl = new FormController();

tg.router.when(new Telegram.TextCommand('/start', 'startCommand'), startCtrl)
    .when(new Telegram.TextCommand('/register', 'formCommand'), formCtrl)
    .otherwise(new OtherwiseController());

function exitHandler(exitCode) {
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));
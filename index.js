'use strict';

const Telegram = require('telegram-node-bot'),
    config = require('./config/config'),
    tg = new Telegram.Telegram(config.TELEGRAM_BOT_TOKEN);

const RegisterController = require('./controllers/register')
    , StartController = require('./controllers/start')
    , VerifyController = require('./controllers/verify')
    , LandingController = require('./controllers/landing')

    
    // , TestController = require('./controllers/test')
    
    , OtherwiseController = require('./controllers/otherwise');

const startCtrl = new StartController()
    , registerCtrl = new RegisterController()
    , landingCtrl = new LandingController()
    , verifyCtrl = new VerifyController();


    // , testCtrl = new TestController()



tg.router.when(new Telegram.TextCommand('/start', 'startCommand'), startCtrl)
    .when(new Telegram.TextCommand('/register', 'registerCommand'), registerCtrl)
    .when(new Telegram.TextCommand('/verify', 'verifyCommand'), verifyCtrl)

    // .when(new Telegram.TextCommand('/test', 'testCommand'), testCtrl)

    .otherwise(new OtherwiseController());

function exitHandler(exitCode) {
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));
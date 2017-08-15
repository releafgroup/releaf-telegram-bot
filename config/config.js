const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: __dirname + '/../env/.env'});

module.exports = Object.freeze({
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN
});
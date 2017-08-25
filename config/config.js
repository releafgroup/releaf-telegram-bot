const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: __dirname + '/../env/.env'});

module.exports = Object.freeze({
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    BASE_URL: process.env.LOCAL_ENV ? process.env.LOCAL_URL : process.env.NODE_ENV === 'development' ? process.env.STAGING_URL : process.env.BASE_URL
});
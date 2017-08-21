'use strict';

const Telegram = require('telegram-node-bot'),
	axios = require('../config/axios');

class VerifyController extends Telegram.TelegramBaseController {
    verifyHandler($) {
    	const name = $._message._from._firstName;
		const verify = {
		    company1: {
			    q: 'Please provide the name of first company?',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		    company1_num: {
			    q: 'Please provide the whatsapp phone number of the company? (Kindly include the +234 country code before the number)',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		    company2: {
			    q: 'Please provide the name of the second company?',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		    company2_num: {
			    q: 'Please provide the whatsapp phone number of the company? (Kindly include the +234 country code before the number)',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		};

		$.runForm(verify, (result) => {
			console.log(result);
				$.sendMessage('Thanks for verifying your business.');

			// axios.post('/businesses', result).then(response => {
			// 	$.sendMessage(`Thanks for registering your business with Releaf *${name}*. Your sign in details has been sent to *${result.email}*`, { parse_mode: 'Markdown' });
				
			// }).catch(err => {
			// 	console.log(err);
			// 	$.sendMessage(`Oops! An error error occured.\n\nType \\register to try again`);
			// })
		});	
    }

    get routes() {
        return {
            'verifyCommand': 'verifyHandler'
        };
    }
}

module.exports = VerifyController;
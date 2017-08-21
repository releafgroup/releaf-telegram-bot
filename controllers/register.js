'use strict';

const Telegram = require('telegram-node-bot'),
	axios = require('../config/axios');

	let password = '';

class RegisterController extends Telegram.TelegramBaseController {
    registerHandler($) {
    	const name = $._message._from._firstName;
		const register = {
		    company_name: {
			    q: 'What is the name of your company?',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		    phone_number: {
			    q: 'What is your WhatsApp phone number? (Kindly include the +234 country code before the number)',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		    email: {
			    q: 'What is your email address?',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		    products: {
			    q: 'What commodities do you supply? (e.g. Maize, Yam)',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		    position_in_chain: {
			    q: `What position do you occupy in the value chain?\n\nInputs, Production, Processing, Wholesale, Retail, Services`,
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    },
		    found_us_via: {
			    q: `Please specify how you found us\n\nArticle, Facebook, Twitter, Friend told you, Other`,
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }	
		    },
		    password: {
			    q: `Password?`,
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
				    	password = message.text;
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }	
		    },
		    password_confirm: {
			    q: `Your password again please?`,
			    error: 'Passwords provided do not match.',
			    validator: (message, callback) => {
				    if(message.text === password) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }	
		    }
		};

		$.runForm(register, (result) => {
			delete result.password_confirm;
			console.log(result);
			axios.post('/businesses', result).then(response => {
				$.sendMessage(`Thanks for registering your business with Releaf *${name}*. Your sign in details has been sent to *${result.email}*`, { parse_mode: 'Markdown' });
				
			}).catch(err => {
				console.log(err);
				$.sendMessage(`Oops! An error error occured.\n\nType \\register to try again`);
			})
		});	
    }

    get routes() {
        return {
            'registerCommand': 'registerHandler'
        };
    }
}

module.exports = RegisterController;
'use strict';

const Telegram = require('telegram-node-bot'),
	axios = require('../config/axios');

	let password = '';

class FormController extends Telegram.TelegramBaseController {
    formHandler($) {
    	const name = $._message._from._firstName;
    	const message = `Hello ${name}, Welcome to Releaf! We give you acccess to trustworthy customers you need to grow your business\n\nWould you like to join our trust network?`; 
		const form = {
		    register: {
			    q: message,
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if (message.text) {
				    	const answer = message.text.split('')[0].toLowerCase();
				    	if (answer === 'y') callback(true, message.text);
					    else if (answer === 'n') $.sendMessage('Alright, good luck in your endeavours. You\'re free to check back at anytime');
				    	else callback(false);
				    }
					
					return;

			    }
		    },
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
		}

		$.runForm(form, (result) => {
			delete result.register;
			delete result.password_confirm;
			console.log(result);
			axios.post('/businesses', result).then(response => {
				$.sendMessage(`Thanks for registering your business with Releaf *${name}*. Your sign in details has been sent to *${result.email}*`, { parse_mode: 'Markdown' });
				
			}).catch(err => {
				console.log(err);
				$.sendMessage(`Oops! An error error occured.\n\nType \\form to try again`);
			})
		});	
    }

    get routes() {
        return {
            'formCommand': 'formHandler'
        };
    }
}

module.exports = FormController;
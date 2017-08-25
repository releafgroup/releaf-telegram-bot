'use strict';

const Telegram = require('telegram-node-bot'),
	axios = require('../config/axios');

function randomChars(length = 8){
    let data = '',
    	chars = ['!','#','@','%','^','&','*','_','.'];
    
    for(let i = 97; i <= 122; i++){
        chars.push(String.fromCharCode(i));
    } 
    
    for(let i = 0; i <= length; i++){
        data += chars[Math.floor(Math.random() * chars.length)];
    } 
    return data;
}

class VerifyController extends Telegram.TelegramBaseController {
    verifyHandler($) {
    	const name = $._message._from._firstName;

    	console.log(randomChars());

    	let user = {},
    		code = {
				otp: randomChars(),
				otpExpires: Date.now + (1000 * 60 * 5)
			};

		const verify = {
			email: {
			    q: 'What\'s your email address please?',
			    error: 'Account does not exist. Please try again with a valid email address',
			    validator: (message, callback) => {
				    if(message.text) {
						axios.put('/businesses/0?email=' + message.text, code).then(response => {
							user = response.data.data;
							console.log(user);
							return callback(true, message.text);
						}).catch(err => {
							console.log(err);
							callback(false);
						});
				    }
				    callback(false);
			    }

			},
			code: {
			    q: `Your magic code has been sent to the provided email address\n\nPlease type it in here to continue the verification process`,
			    error: 'Code invalid',
			    validator: (message, callback) => {
				    if(message.text) {	
						axios.get('/businesses/0?code=' + user.otp).then(response => {
							user = response.data.data;
							console.log(user);
							return callback(true, message.text);
						}).catch(err => {
							console.log(err);
							callback(false);
						});
				    }
				    callback(false);
			    }

			},
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
			delete result.email;
			delete result.code;
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
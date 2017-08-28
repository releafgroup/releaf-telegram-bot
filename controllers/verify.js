'use strict';

const Telegram = require('telegram-node-bot'),
	axios = require('../config/axios'),
	nodeMailer = require('../libs/node_mailer');



function randomChars(length = 8){
    let data = '', chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    for(let i = 0; i <= length; i++){
        data += chars[Math.floor(Math.random() * chars.length)];
    } 
    return data;
}

class VerifyController extends Telegram.TelegramBaseController {
    verifyHandler($) {
    	const name = $._message._from._firstName,
    		code_expiresIn = 1000  * 60 * 5;

    	let user = {},
    		code = {
				otp: randomChars(),
				otpExpires: Date.now() + code_expiresIn
			};

		const verify = {
			email: {
			    q: 'What\'s your email address please?',
			    error: 'Account does not exist. Please try again with a valid email address',
			    validator: (message, callback) => {
				    if(message.text) {
						axios.put('/businesses/0?email=' + message.text, code).then(response => {
							user = response.data.data;

                        	const subject = 'Your Releaf Verification Code';
	                        const body = `Greetings ${user.company_name || '[Company Name Not Provided]'},<br/><br/>
	                        Thanks for taking the step to verify your account on our platform.<br/>
	                        Your magic code is <b>${user.otp}</b>. You'll need to request for another code if you do not use this before it's <b>${new Date(code_expiresIn).getMinutes()} expiration</b> period elapses.<br/><br/>
							Thanks for using Releaf.<br/><br/>
	                        Cheers, <br/><br/>
	                        <i>the</i>ReleafBot,<br/>
	                        Releaf Inc.`
	                        
	                        nodeMailer.send(
	                            subject,
	                            body,
	                            user.email,
	                            [],
	                            [],
	                            '<donotreply@releaf.ng>',
	                            function(err) {
	                                if(!err) console.log('Code sent successfully');
	                                else console.log(err);
	                            }
	                        );
							return callback(true, message.text);
						}).catch(err => {
							console.log(err);
							callback(false);
						});
				    }
				    // callback(false);
			    }

			},
			code: {
			    q: `Your magic code has been sent to the provided email address\n\nPlease type it in here to continue the verification process`,
			    error: 'Code invalid',
			    validator: (message, callback) => { 
			    	if(message.text == user.otp && (Date.now() < Date.parse(user.otpExpires))){
				    	return callback(true, message.text);
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
			const firm1 = {
				name: result.company1,
				whatsAppNumber:  result.company1_num
			},
			firm2 = {
				name: result.company2,
				whatsAppNumber: result.company2_num
			};
			user.is_verified = 1;
			user.companies_dealt_with = [firm1, firm2];
			
			axios.put('/businesses/' + user._id, user).then(response => {
				$.sendMessage('Your account verification was successful!');	
			}).catch(err => {
				console.log(err);
				$.sendMessage(`Oops! An error error occured.\n\nType \\verify to try again`);
			})
		});	
    }

    get routes() {
        return {
            'verifyCommand': 'verifyHandler'
        };
    }
}

module.exports = VerifyController;
'use strict';

const Telegram = require('telegram-node-bot');

class FormController extends Telegram.TelegramBaseController {
    formHandler($) {
    	const name = $._message._from._firstName;
    	const message = `Hello ${name}, Welcome to Releaf! We give you acccess trustworthy customers you need to grow your business\n\nWould you like to join our trust network?`; 
		const form = {
		    register: {
			    q: message,
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if (message.text) {
				    	const answer = message.text.split('')[0].toLowerCase();
				    	if (answer === 'y') callback(true, message.text);
					    else if (answer === 'n') $.sendMessage('Alright, good luck in your endeavours. You\'re free to check back at anytime');
					    return;
				    }

				    callback(false);
			    }
		    },
		    businessName: {
			    q: 'What is the name of your company',
			    error: 'Sorry, wrong input',
			    validator: (message, callback) => {
				    if(message.text) {
					    callback(true, message.text);
					    return;
				    }

				    callback(false);
			    }
		    }
		}

		$.runForm(form, (result) => {
			$.sendMessage(`Alright Thanks! I\'ll tell the mouseketeers right away that *${result.businessName}* is now on our platform.`, { parse_mode: 'Markdown' });
		});	
    }

    get routes() {
        return {
            'formCommand': 'formHandler'
        };
    }
}

module.exports = FormController;
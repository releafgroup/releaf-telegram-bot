'use strict';

const Telegram = require('telegram-node-bot'),
     LandingController = require('./landing');


class StartController extends Telegram.TelegramBaseController {
    startHandler($) {
    	const name = $._message._from._firstName;
            $.runInlineMenu({
                layout: 2, //some layouting here
                method: 'sendMessage', //here you must pass the method name
                params: [`Hello ${name}, Welcome to Releaf! We give you acccess to trustworthy customers you need to grow your business.\n\nWould you like to join our trust network?`], //here you must pass the parameters for that method
                menu: [
                    {
                        text: 'Yes', //text of the button
                        callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
                            new LandingController().landingHandler($);
                        }
                    },
                    {
                        text: 'No',
                        message: 'Are you sure?',
                        layout: 2,
                        menu: [ //Sub menu (current message will be edited)
                            {
                                text: 'Yes!',
                                callback: () => {
                                    $.sendMessage(`Sorry to see you go ${name}. Please check back again.`);

                                }
                            },
                            {
                                text: 'No!',
                                callback: () => {
                                    // this.startHandler($);
                                    $.sendMessage('Great! Kindly choose one of the options listed above.');

                                }
                            }
                        ]
                    }
                ]
            });  	
    }

    get routes() {
        return {
            'startCommand': 'startHandler'
        };
    }
}

module.exports = StartController;

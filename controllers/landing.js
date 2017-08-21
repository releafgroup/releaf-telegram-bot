'use strict';

const Telegram = require('telegram-node-bot'),
     VerifyController = require('./verify'),
     RegisterController = require('./register');

class LandingController extends Telegram.TelegramBaseController {
    landingHandler($) {
        $.runInlineMenu({
            layout: 1, //some layouting here
            method: 'sendMessage', //here you must pass the method name
            params: ['Please select one of the following options:'], //here you must pass the parameters for that method
            menu: [
                {
                    text: 'Register your business with Releaf', //text of the button
                    callback: (callbackQuery, message) => { //to your callback will be passed callbackQuery and response from method
                        new RegisterController().registerHandler($);
                    }
                },
                {
                    text: 'Verify your business',
                    message: 'Are you sure?',
                    layout: 2,
                    menu: [ //Sub menu (current message will be edited)
                        {
                            text: 'Yes!',
                            callback: () => {

                            }
                        },
                        {
                            text: 'No!',
                            callback: () => {

                            }
                        }
                    ]
                },
                {
                    text: 'Make sales request',
                    message: 'Are you sure?',
                    layout: 2,
                    menu: [ //Sub menu (current message will be edited)
                        {
                            text: 'Yes!',
                            callback: () => {

                            }
                        },
                        {
                            text: 'No!',
                            callback: () => {

                            }
                        }
                    ]
                },
                {
                    text: 'Exit',
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
            'landingCommand': 'landingHandler'
        };
    }
}

module.exports = LandingController;
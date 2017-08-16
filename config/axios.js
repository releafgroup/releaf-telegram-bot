const axios = require('axios'),
	config = require('./config');
axios.defaults.baseURL = config.BASE_URL;
module.exports = axios; 
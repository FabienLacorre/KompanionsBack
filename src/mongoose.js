const getenv = require('getenv');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_ADDON_URI);

module.exports = mongoose;

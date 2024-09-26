const mongoose = require('mongoose');

const userSchema = require('../schema/user');

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
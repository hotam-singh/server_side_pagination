var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    gender: String,
    username: String,
    mobile: String
});

module.exports = mongoose.model('users', userSchema);
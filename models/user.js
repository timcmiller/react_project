var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, require: true, index: true, unique: true}
});

module.exports = exports = mongoose.model('User', userSchema);

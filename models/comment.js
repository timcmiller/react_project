var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  body: {type: String, required: true},
  author: {type: String, default: 'Anonyomous'},
  timeStamp: Number

});

module.exports = exports = mongoose.model('Comment', commentSchema);

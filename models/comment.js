var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  text: {type: String, required: true},
  author: {type: String, default: 'Anonyomous'},
  timestamp: String,
  editing: Boolean

});

module.exports = exports = mongoose.model('Comment', commentSchema);

var express = require('express');
var bodyParser = require('body-parser');
var Comment = require(__dirnam + '/../models/comment.js');

var commentRouter = module.exports = exports = express.Router();

commentRouter.get('/comments', function(req, res) {
  Comment.find({}, function(err, data) {
    if(err) throw err;

    res.send(data);
  });
});

commentRouter.post('/comments', bodyParser.json(), function(req, res) {
  var newComment = new Comment(req.body);

  newComment.save(function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

commentRouter.put('/comments/:id', bodyParser.json(), function(req, res) {
  var commentData = req.body;
  delete commentData._id;
  Comment.update({_id: req.params.id}, commentData, function(err) {
    if(err) throw err;

    res.send('updated!');
  });
});

commentRouter.delete('/comments/:id', bodyParser.json(), function(req, res) {
  comment.remove({_id: req.params.id}, function(err) {
    if(err) throw err;

    res.send('deleted!');
  });
});


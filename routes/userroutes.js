var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user.js');

var userRouter = module.exports = exports = express.Router();

userRouter.post('/signup', bodyParser.json(), function(req, res) {
  var user = new User(req.body);
  newUser.save(function(err, data) {
    if(err) throw err;

    res.json(data);
  });
});

userRouter.put('/user/:id', bodyParser.json(), function(req, res) {

  var userData = req.body;
  delete userDate._id;
  User.update({_id: req.params.id}, userData, function(err) {
    if(err) throw err;

    res.send('updated!');
  });
});



userRouter.delete('/signout/:id', bodyParser.json, function(req, res) {
  User.remove({_id: req.params.id}, function(err) {
    if(err) throw err;

    res.send('deleted!');
  });
});

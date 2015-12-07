var express = require('express');
var app = express();
var mongoose = require('mongoose');
var commentsRouter = require(__dirname + '/routes/commentroutes.js');

mongoose.connect(process.env.MONGOLAB_URL || 'mongodb://localhost/react_dev');

app.use('/api', commentsRouter);

app.use('/', express.static(__dirname + '/build'));

app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 5000, function() {
  console.log('server up and running');
});

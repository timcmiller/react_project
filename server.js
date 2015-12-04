var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URL || 'mongodb://localhost/react_dev');


app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server up and running');
});

var express = require('express');
var app = express();

mongoose.connect(process.env.MONGOLAB_URL || 'mongodb://localhost/react_dev');


app.use(function(req, res) {
  res.status(404).send('could not find file');
});

app.listen(process.end.PORT || 3000, function() {
  console.log('server up and running');
});

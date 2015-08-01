var express = require('express');
var app = express();
app.use(express.logger());

app.use(express.static(__dirname + '/www'));

var port = process.env.PORT || 7000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

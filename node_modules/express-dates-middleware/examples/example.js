'use strict';

var express = require('express');
var app = express();
var dates = require('../express-dates-middleware');

app.use(dates);

app.get('/', function (req, res) {
  res.send({
      startDate: req.query.startDate,
      endDate: req.query.endDate
  });
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server listening on port:', port);
});

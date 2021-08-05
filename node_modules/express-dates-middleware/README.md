express-dates-middleware
=========

[![Build Status](https://travis-ci.org/mattpker/express-dates-middleware.svg)](https://travis-ci.org/mattpker/express-dates-middleware) [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mattpker/express-dates-middleware?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Express middleware for providing a common start date and end date.

This module can be used as a middleware for express for providing common startDate and endDate parameters. This is helpful when creating an API that may need a start date or end date on some endpoints.

The following startDate and endDate parameters are returned depending on what parameters are provided:

* startDate & endDate: Provides a proper date object of the startDate & endDate.
* No startDate & endDate: Provides a startDate of the beginning of today and an endDate of the ending of today.
* endDate: Provides only that day, the startDate is the beginning of the endDate provided and the endDate is the end of that day.
* startDate: Provides the startDate to the end of the current day as the endDate.

## Installation

    npm install express-dates-middleware

## Usage

```
var express = require('express');
var app = express();
var dates = require('express-dates-middleware');

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
```

You can then go to your browser and test the different returns:

http://localhost:3000/

http://localhost:3000/?startDate=12/15/2015

http://localhost:3000/?endDate=12/15/2015

http://localhost:3000/?startDate=12/15/2015&endDate=12/25/2015

## Tests

    npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release

'use strict';

var moment = require('moment');

// Midleware for express to convert startDate and endDate request parameters
module.exports = function(req, res, next) {

    var startDate,
        endDate;

    // Function to parse a string into an integer for use as a milisecond epoch
    var parseEpoch = function(date) {
        // If the date string is just numbers
        if (!isNaN(date)) {
            // If the length of the sting is then 13, assume it is a epoch based on seconds and not miliseconds
            if (date.length < 13) {
                // Change the sting into an integer
                date = parseInt(date);
                // Multiply the integer by 1000 to get the milisecond epoch and reurn the value
                return date * 1000;
            } else {
                // Return the string as an integer
                return parseInt(date);
            }
        } else {
            // Just return the sting as it is not an epoch
            return date;
        }
    };

    // If we dont have a startDate and endDate, send the current day
    if (!req.query.startDate && !req.query.endDate) {
        req.query.startDate = new Date(moment().format('L') + ' 00:00:00');
        req.query.endDate = new Date(moment().format('L') + ' 23:59:59');
    }

    // If we have only a start date, return from start date to current day
    else if (req.query.startDate && !req.query.endDate) {

        startDate = parseEpoch(req.query.startDate);

        req.query.startDate = new Date(startDate);
        req.query.endDate = new Date(moment().format('L') + ' 23:59:59');
    }


    // If we only have an end date, return only that day
    else if (!req.query.startDate && req.query.endDate) {

        endDate = parseEpoch(req.query.endDate);

        req.query.startDate = new Date(moment(new Date(endDate)).format('L') + ' 00:00:00');
        req.query.endDate = new Date(moment(new Date(endDate)).format('L') + ' 23:59:59');
    }

    // If we have both a startDate and endDate, convert to Date objects
    else if (req.query.startDate && req.query.endDate) {

        startDate = parseEpoch(req.query.startDate);
        endDate = parseEpoch(req.query.endDate);

        req.query.startDate = new Date(startDate);
        req.query.endDate = new Date(endDate);
    }

    // keep executing the router middleware
    next();

};

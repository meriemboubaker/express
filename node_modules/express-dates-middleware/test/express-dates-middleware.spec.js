'use strict';

var expect = require('chai').expect;
var dates = require('../express-dates-middleware');
var moment = require('moment');

describe('express-dates-middleware', function() {
    it('should return a start and end date for no provided dates', function(done) {
        var res = {};
        var req = {};
        req.query = {
            startDate: '',
            endDate: ''
        };

        dates(req, res, function() {
            expect(req.query, 'should be an object').to.be.an('object');
            expect(req.query, 'should have a start date and end date').to.have.ownProperty('startDate', 'endDate');
            expect(req.query.startDate, 'start date should be correct').to.deep.equal(new Date(moment().format('L') + ' 00:00:00'));
            expect(req.query.endDate, 'end date should be correct').to.deep.equal(new Date(moment().format('L') + ' 23:59:59'));
        });

        done();
    });

    it('should return a start and end date for start date provided', function(done) {
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 1);
        var res = {};
        var req = {};
        req.query = {
            startDate: startDate.getTime(),
            endDate: ''
        };

        dates(req, res, function() {
            expect(req.query, 'should be an object').to.be.an('object');
            expect(req.query, 'should have a start date and end date').to.have.ownProperty('startDate', 'endDate');
            expect(req.query.startDate, 'start date should be correct').to.deep.equal(startDate);
            expect(req.query.endDate, 'end date should be correct').to.deep.equal(new Date(moment().format('L') + ' 23:59:59'));
        });

        done();
    });

    it('should return a start and end date for end date provided', function(done) {
        var endDate = new Date();
        endDate.setDate(endDate.getDate() - 1);
        var res = {};
        var req = {};
        req.query = {
            startDate: '',
            endDate: endDate.getTime()
        };

        dates(req, res, function() {
            expect(req.query, 'should be an object').to.be.an('object');
            expect(req.query, 'should have a start date and end date').to.have.ownProperty('startDate', 'endDate');
            expect(req.query.startDate, 'start date should be correct').to.deep.equal(new Date(moment(endDate).format('L') + ' 00:00:00'));
            expect(req.query.endDate, 'end date should be correct').to.deep.equal(new Date(moment(endDate).format('L') + ' 23:59:59'));
        });

        done();
    });

    it('should return a start and end date for both date provided', function(done) {
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 4);
        var endDate = new Date();
        endDate.setDate(endDate.getDate() - 1);
        var res = {};
        var req = {};
        req.query = {
            startDate: startDate.getTime(),
            endDate: endDate.getTime()
        };

        dates(req, res, function() {
            expect(req.query, 'should be an object').to.be.an('object');
            expect(req.query, 'should have a start date and end date').to.have.ownProperty('startDate', 'endDate');
            expect(req.query.startDate, 'start date should be correct').to.deep.equal(startDate);
            expect(req.query.endDate, 'end date should be correct').to.deep.equal(endDate);
        });

        done();
    });
});

var express = require('express');
var mongoose = require('mongoose');

var User = require('./user');

mongoose.connect('mongodb://localhost:27017/pagination', { useMongoClient: true }, function(err, db) {
    if(err) throw err;
    console.log('database connected successfully');
});

var app = express();

app.get('/', function(req, res) {
    res.send('<h1>welcome to server side pagination demo</h1><br><h3>Enter any url containing <b>/users/page_no/per_page</b></h3>');
});

app.get('/users/:page/:perPage', function(req, res) {
    console.log('page number : ' + req.params.page);
    console.log('per page : ' + req.params.perPage);
    var pageNo = req.params.page ;                      //    parseInt(req.query.pageNo)
    var size = req.params.perPage;
    var query = {}
    if (pageNo < 0 || pageNo === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    User.find({}, {}, query, function (err, data) {
        // Mongo command to fetch all data from collection.
        if (err) {
            response = { "error": true, "message": "Error fetching data" };
        } else {
            response = { "error": false, "message": data };
        }
        res.json(response);
    });
});

app.listen(8083, function(req, res) {
    console.log('server started on port : 8083');
});
    
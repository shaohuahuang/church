var express = require('express');
var path = require('path');
var request = require('request');
var config = require('./server-config');
var app = express();
var fs = require('fs');

config.configServer(app);


app.get('/*', function(req, res, next){
    res.sendFile('prospace.html',{root: path.join(__dirname, 'public')});
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

config.startServer(app);

module.exports = app;

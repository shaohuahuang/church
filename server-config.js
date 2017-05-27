var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');

module.exports.configServer = function(app){
    app.set('port', process.env.PORT || '5000');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '/')));
}

module.exports.startServer = function(app){
    var server = http.createServer(app);
    var boot = function () {
        server.listen(app.get('port'), function(){
            console.info('Express server listening on port ' + app.get('port'));
        });
    }
    boot();
}

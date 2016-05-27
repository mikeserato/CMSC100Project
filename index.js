var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var server = app.listen(1337, "localhost", 
    	function(){
	        var host = server.address().address;
	        var port = server.address().port;
	        console.log('Example app is listening at http://%s:%s', host, port);
    	});
    	
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('method-override')()); //to use put and delete HTTP requests
app.use(express.static(__dirname + '/public'));

app.use(require(__dirname + '/config/Router')(express.Router()));

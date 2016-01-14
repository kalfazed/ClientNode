var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var http = require('http');
var process = require('child_process');

var CDITest;


app.get("/cdiTest", function(req, res){
    
    CDITest = process.execFile('CDITest.bat', [], null, function(error, stdout, stderr){
        	console.log(error);
        	console.log("Running CDI Test");
    });
    
    res.send("CDI test running");
});

app.get("/", function(req, res){
    
    res.send("This is agent");
});


app.get("/reBoot", function(req, res){
    
    CDITest = process.execFile('reboot.bat', [], null, function(error, stdout, stderr){
	       console.log(error);
	       console.log("rebooting");
    });
    
    res.send("Agent is rebooting");
});



app.listen(8000);
console.log("Agent is running at port 8000");

module.exports = app;

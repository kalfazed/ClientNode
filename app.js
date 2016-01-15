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
var CDITestInfo;
var rebootTest;
var rebootTestInfo;


var controllerIP = "http://192.168.130.115:8888";
var rebootSucceedIP = controllerIP + "/rebootSucceed";
var cdiSucceedIP = controllerIP + "/cdiSucceed";
var bootSucceedIP = controllerIP + "/bootSucceed";


app.get("/cdiTest", function(req, res){
    
    CDITest = process.execFile('CDITest.bat', [], null, function(error, stdout, stderr){
        	console.log(error);
        	console.log("Running CDI Test");
    });

    CDITestInfo = process.execFile('curl.bat', [cdiSucceedIP], null, function(error, stdout, stderr){
        	console.log(error);
        	console.log("Running CDI Test");
    });
        
    res.redirect(cdiSucceedIP);
});

app.get("/", function(req, res){
    bootTestInfo = process.execFile('curl.bat', [rebootSucceedIP], null, function(error, stdout, stderr){
	       console.log(error);
	       console.log("rebooting");
    });
    
});


app.get("/reBoot", function(req, res){
    
    rebootTest = process.execFile('reboot.bat', [], null, function(error, stdout, stderr){
	       console.log(error);
	       console.log("rebooting");
    });
    
    res.redirect(rebootSucceedIP);
});


app.listen(8000);

console.log("Agent is running at port 8000");
bootTestInfo = process.execFile('curl.bat', [bootSucceedIP], null, function(error, stdout, stderr){
	   console.log(error);
	   console.log("boot finished");
});

module.exports = app;

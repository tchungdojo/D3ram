var gzippo = require('gzippo');
var express = require('express');
var app = express();

var path = require('path');
app.use(express.static(path.join(__dirname, './client')));


// app.use(express.logger('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);
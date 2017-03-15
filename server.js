var express = require('express');
var app = express();
var proxy = require('http-proxy-middleware');


app.use(express.static('src'));
app.listen(10001);
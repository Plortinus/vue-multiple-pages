var TARGET = 'https://github.com';
var express = require('express');
var app = express();
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

app.use(express.static('./dist'));

app.all('/*', function(req, res, next) {
  console.log(req.url);
  return proxy.web(req, res, {
    target: TARGET
  });
  // next();
});

app.get('/', function(req, res) {
  res.send('Hello Vue');
});

app.listen(2333);

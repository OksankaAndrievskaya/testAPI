const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  http = require('http'),
  path = require('path');

global.baseFolder = __dirname;

const env = require('./config/env');
const cron = require('./helpers/cronFile');

app.set('port', env.port);
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'test-api',
  resave: false,
  saveUninitialized: false,
}));

//API
app.use('/api', require('./routes/index.js')());
app.get('/*', (req, res) => {
  res.send('frontend api')
});

process.on('uncaughtException', (err) => {
  console.log(err)
});

http.createServer(app).listen(app.get('port'), () => {
  console.log(
    `Server started at ${app.get('port')} with ${process.pid} process id`)
});

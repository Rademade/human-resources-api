let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let expressValidator = require('express-validator');
let routes = require('./routes');

let app = express();

app.use(logger('dev'));

app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', function (req,res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
app.use('/api', routes);

module.exports = app;

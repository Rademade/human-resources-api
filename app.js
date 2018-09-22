let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let expressValidator = require('express-validator');
let routes = require('./routes');
let cors = require('cors');

let app = express();

app.use(logger('dev'));

app.use(cors());
app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let corsOptions = {};
let whitelist = ['https://human-resources-web.firebaseapp.com'];
if (process.env.NODE_ENV === 'production') {
  corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, false)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  };
} else {
  corsOptions = {origin: false}
}

app.use('/index', function (req,res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
app.use('/api' ,cors(corsOptions), routes);

module.exports = app;

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

// let whitelist = ['https://human-resources-web.firebaseapp.com', 'http://localhost:3000'];
let corsOptions = { origin: false }
// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// };

app.use('/index', function (req,res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
app.use('/api' ,cors(corsOptions), routes);

module.exports = app;

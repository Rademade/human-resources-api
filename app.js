let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let expressValidator = require('express-validator');
let routes = require('./routes');
let cors = require('cors');
const session = require('express-session');
const MemcachedStore = require('connect-memjs')(session);
const passport = require('passport');
const config = require('./config');

let app = express();
const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: config.get('SECRET'),
  signed: true
};

// In production use the Memcache instance to store session data,
// otherwise fallback to the default MemoryStore in development.
if (config.get('NODE_ENV') === 'production' && config.get('MEMCACHE_URL')) {
  if (config.get('MEMCACHE_USERNAME') && (config.get('MEMCACHE_PASSWORD'))) {
    sessionConfig.store = new MemcachedStore({
      servers: [config.get('MEMCACHE_URL')],
      username: config.get('MEMCACHE_USERNAME'),
      password: config.get('MEMCACHE_PASSWORD')});
  } else {
    sessionConfig.store = new MemcachedStore({
      servers: [config.get('MEMCACHE_URL')]
    });
  }
}
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

app.use(logger('dev'));
app.use(cors());
app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./routes/oauth2').router);

app.use('/index', function (req,res) {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
app.use('/api', cors(corsOptions), routes);

module.exports = app;

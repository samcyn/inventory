require('dotenv').config();
global._pathfinder = require('./config/path_finder');

// let fs = require('fs');
let express = require('express');
let logger = require('morgan');
let database = require(_pathfinder.database);
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
let Log = require(_pathfinder.join(_pathfinder.utils, 'log') );
let connection;
let index = require('./routes/index');
let validator = require('express-validator');

let customValidator = require( _pathfinder.join( _pathfinder.middlewares, 'validators/custom-validator') );
let customSanitizer = require( _pathfinder.join( _pathfinder.middlewares, 'validators/custom-sanitizer') );
let cors = require('cors');

global._console = new Log({
    console: {
        enabled: process.env.NODE_ENV !== 'production',
        level: 'debug'
    },
    file: {
        enabled: process.env.NODE_ENV === 'production',
        filename: './storage/logs/sso.log'
    }
});


app.set('mongooseConnection', connection);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}));
// app.engine('html', ejs.renderFile);
// app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator({customValidators: customValidator, customSanitizers: customSanitizer}));
app.use('/', index);
// app.set('sessionStore', sessionStore);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', err);
});

function exitHandler(options, err) {
    if (options.cleanup) database.mongoose.connection.close();
    if (err) _console.log(err.stack);
    //if (options.exit) process.exit();
}

module.exports = app;

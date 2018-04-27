var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://test:12345@ds259109.mlab.com:59109/infox');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/api/v1/orgs', require('./routes/orgs'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/groups', require('./routes/groups'));
app.use('/api/v1/docs', require('./routes/docs'));
app.use('/api/v1/share', require('./routes/shares'));


app.use('/', require('./routes/index'));
app.use('/:pram', require('./routes/index'));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const createError = require('http-errors');
const express = require('express');
const next = require('next');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
// router
const ApiRoute = require('./routes');

const app = express();

mongoose.connect('mongodb://localhost/movieticket');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({
  dev,
  dir: './app',
});
const handle = nextApp.getRequestHandler();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
nextApp
  .prepare()
  .then(() => {
    // api routes
    app.use('/api/v1', ApiRoute);
    // next js handler
    app.get('*', (req, res) => {
      return handle(req, res);
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

  });
app.listen(port);
// module.exports = app;

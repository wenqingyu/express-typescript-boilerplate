'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const mysql = require('mysql');
const middleware = require('./middleware.js');
const validation = require('./services/validation.js');

// const config = require('./config.js');
const app = express();
/* ---------- SITE CONFIG ----------- */
// PORT
// app.set('port', process.env.PORT || 3001);
middleware.mongodb();
// app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));

// HEADER
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Json-Web-Token");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  //set cache header
  res.setHeader("Cache-Control", "public, max-age=60"); // 1 min
  //set json response for all requests
  res.setHeader('Content-Type', 'application/json');

  // intercept OPTIONS method
    if (req.method == 'OPTIONS') {
        res.status(200).send();
    }
    else {
        next();
    }

  // next();
});

app.options('*', (req, res) => {
  res.send(200)
})

/* ---------- MYSQL CONFIG --------------- */


/* ---------- CONTROLLERS CONFIG ----------- */
const homeController = require('./controllers/home');


/* ---------- ROUTES CONFIG ---------------- */

/*  -- /api/v1 -- */
const api_prefix = '/v1';

// general user acess
// app.get(api_prefix + '/simplex/:account', validation.jwtVerify, simplexController.getPayments); // get payment list
// app.post(api_prefix + '/simplex/create/:account', validation.jwtVerify, simplexController.createPayment); // create payment
// app.post(api_prefix + '/simplex/cancel/:account', validation.jwtVerify, simplexController.cancelPayment); // get payment list


// gateway access
// Whitelist
// app.get(api_prefix + '/gateway/deposit', despositWithdrawController.greet); // greet
// app.post(api_prefix + '/gateway/deposit', despositWithdrawController.deposit); // deposit




/* ------------- Report ------------- */
// Simplex Report: Whitelist
// Test
// app.get(api_prefix + '/report/simplex/funding/:account', reportController.getSimplexReport); // get simplex report
// app.get(api_prefix + '/report/affiliate/:account', reportController.getAffiliateReport); // get affiliate report

// // Online
// app.get(api_prefix + '/report/simplex/:account', validation.jwtVerify, simplexController.getPayments); // get payment list
// app.post(api_prefix + '/report/simplex/create/:account', validation.jwtVerify, simplexController.createPayment); // create payment
// app.post(api_prefix + '/report/simplex/cancel/:account', validation.jwtVerify, simplexController.cancelPayment); // get payment list

// app.get(api_prefix + '/user/:account', userController.get);
// app.post(api_prefix + '/user', userController.create);
// app.put(api_prefix + '/user', userController.update);
// app.delete(api_prefix + '/user/:account', userController.remove);
//

app.get('/*', homeController.greet);


/* ------------ ERROR HANDLE AND ENV CONFIG ---------- */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});


/**
 * Error Handler.
 */
app.use(errorHandler());

/* ------------ ENGINE STARTER ---------- */

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3005);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;

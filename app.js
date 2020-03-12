var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ProductsRoute = require('./routes/Products/Products');
var OrdersRouter = require('./routes/Orders/Orders');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')

var app = express();

/*** view engine setup *** */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**** mogan express json middlewares***** */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Handling Cors errors during api connections
app.use((req, res, next) => {
  res.header('Acess-Control-Allow-Origin', '*'),
    res.header(
      'Acess-Control-Allow-headers',
      'Origin,X-Requested-With , Content-Type ,Accept,Authorization'
    );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,UPDATE')
    return res.status(200).json({})
  }
  next();
});

/********** Routes that handle all requests   ************ */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/products', ProductsRoute);
app.use('/api/orders', OrdersRouter);

/***** creating mongodb connection to the database*** */
mongoose.connect('mongodb://localhost/shop_api', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

/**** catch 404 and forward to error handler *****/
app.use((req, res, next) => {
  next(createError(404));
});

/*** error handler ****/
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error_message: err.message
  })
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser('lyj'));
app.use(session({
  resave:false,//强制session保存到session store中 即使没有发生变化
  saveUninitialized:true,//强制存储未初始化的session
  secret: 'lyj',
  cookie:{ path: '/',
    httpOnly: true,//只能被web server访问
    secure: false,//只能被HTTPS使用，类型Boolean，默认为false
    // expires:Date类型，若为0则浏览器关闭后
    // maxAge: 1000*10 
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  res.redirect('/error')
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
});
console.log('Running at 3001……')
module.exports = app;

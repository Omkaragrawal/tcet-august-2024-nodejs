import createError from 'http-errors';
import express, { Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import './Env';

import './Database';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import { ErrorDescription } from 'mongodb';

const app = express();

// view engine setup
app.set('views', path.join('./', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join('./', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(_, __, next) {
  next(createError(404));
});

// error handler
app.use(function(err: ErrorDescription, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3334, () => {
  console.log("App is listening on port 3334");
});

// npm i -D tsx @types/node @types/express typescript
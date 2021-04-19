/* eslint-disable no-param-reassign */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const auth = require('./middlewares/auth');

app.use(bodyParser.json());

const usersRouter = require('./routes/users.js');
const moviesRouter = require('./routes/movies.js');
const signIn = require('./routes/signin.js');
const signUp = require('./routes/signup.js');

app.use('/', signIn);
app.use('/', signUp);
app.use(auth);
app.use('/', usersRouter);
app.use('/', moviesRouter);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    err.statusCode = 400;
    err.message = 'Ошибка валидации';
  } else if (err.code === 11000) {
    err.statusCode = 409;
    err.message = 'Пользователь с таким емейлом уже существует';
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

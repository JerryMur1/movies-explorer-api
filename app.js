const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
const auth = require('./middlewares/auth');

app.use(bodyParser.json());
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRouter = require('./routes/users.js');
const moviesRouter = require('./routes/movies.js');
const signIn = require('./routes/signin.js');
const signUp = require('./routes/signup.js');

const { errorHandler } = require('./errors/centralError');
app.use(requestLogger);
app.use('/', signIn);
app.use('/', signUp);
app.use(auth);
app.use('/', usersRouter);
app.use('/', moviesRouter);
app.use(errors());
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

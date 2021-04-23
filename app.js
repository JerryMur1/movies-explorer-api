const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const { errorHandler } = require('./errors/centralError');

const app = express();
const { auth } = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(bodyParser.json());

const { requestLogger, errorLogger } = require('./middlewares/logger');
const signIn = require('./routes/signin.js');
const signUp = require('./routes/signup.js');
const usersRouter = require('./routes/users.js');
const moviesRouter = require('./routes/movies.js');

app.use(requestLogger);
app.use('/', signIn);
app.use('/', signUp);

app.use(auth);
app.use('/', usersRouter);
app.use('/', moviesRouter);

app.use(errors());

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

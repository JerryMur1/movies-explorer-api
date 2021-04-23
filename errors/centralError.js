/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    err.statusCode = 400;
    err.message = 'Ошибка валидации';
  } if (err.code === 11000) {
    err.statusCode = 409;
    err.message = 'Пользователь с таким емейлом уже существует';
  }
  console.log(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
}

module.exports = {
  errorHandler,
};

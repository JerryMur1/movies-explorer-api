const MoviesModel = require('../models/movies');

const NotFoundError = require('../errors/error.js');
const { NewError } = require('../errors/NewError');

const getMovies = (req, res, next) => MoviesModel.find({ owner: req.user }).select('-owner')
  .then((movies) => res.status(200).send(movies))
  .catch(next);

const postMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer,
    thumbnail, nameRU, nameEN, movieId,
  } = req.body;
  MoviesModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: req.user,
  })
    .then(() => res.status(200).send({ message: 'Фильм создан' }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.user;
  const { movieId } = req.params;
  MoviesModel.findById(movieId)
    .orFail(() => { throw new NotFoundError('Такого фильма в базе нет'); })
    .then((movie) => {
      if (JSON.stringify(movie.owner) !== JSON.stringify(_id)) {
        throw new NewError('Удалять можно только свои фильмы');
      } else {
        movie.remove()
          .then(() => {
            res.send({ message: 'Фильм успешно удален' });
          })
          .catch(next);
      }
    })
    .catch(next);
};
module.exports = {
  getMovies, postMovie, deleteMovie,
};

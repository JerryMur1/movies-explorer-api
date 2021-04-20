const MoviesModel = require('../models/movies');

const NotFoundError = require('../errors/error.js');

const getMovies = (req, res, next) => MoviesModel.find({ owner: req.user._id })
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
    owner: req.user._id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { owner } = req.user._id;
  MoviesModel.findById(owner);
  MoviesModel.findByIdAndRemove(movieId)
    .orFail(() => { throw new NotFoundError('Такого фильма в базе нет'); })
    .then((card) => res.status(200).send(card))
    .catch(next);
};
module.exports = {
  getMovies, postMovie, deleteMovie,
};

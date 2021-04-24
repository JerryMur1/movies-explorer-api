const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2),
      director: Joi.string().required().min(2),
      duration: Joi.number().required().min(2),
      year: Joi.string().required().min(2),
      description: Joi.string().required().min(2),
      image: Joi.string().required().min(2).pattern(new RegExp(/w*[\da-zA-Z\W]+#?/)),
      trailer: Joi.string().required().min(2).pattern(new RegExp(/w*[\da-zA-Z\W]+#?/)),
      nameRU: Joi.string().required().min(2),
      nameEN: Joi.string().required().min(2),
      thumbnail: Joi.string().required().min(2).pattern(new RegExp(/w*[\da-zA-Z\W]+#?/)),
      movieId: Joi.number().required().label('id'),
      owner: Joi.string().required().min(2),
    }),
  }), postMovie);
router.delete('/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }), deleteMovie);

module.exports = router;

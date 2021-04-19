const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');

router.post('/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2),
      email: Joi.string().required().min(2).email(),
      password: Joi.string().required().min(2),
    }),
  }), createUser);

module.exports = router;

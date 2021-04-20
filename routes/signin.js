const router = require('express').Router();

const { Joi, celebrate } = require('celebrate');
const { login } = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    password: Joi.string().required().min(2),
  }),
}), login);

module.exports = router;

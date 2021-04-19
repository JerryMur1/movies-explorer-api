const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser, patchProfile,
} = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2),
      email: Joi.string().required().min(2).email(),
    }),
  }), patchProfile);
module.exports = router;

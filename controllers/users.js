const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require('../models/user');

const SALT_ROUNDS = 10;
const NotFoundError = require('../errors/error.js');

const getUser = (req, res, next) => UserModel.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Такого пользователя в базе нет');
    }
    return res.status(200).send(user);
  })
  .catch(next);

const patchProfile = (req, res, next) => {
  const { name, email } = req.body;
  UserModel.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError('Такого пользователя в базе нет');
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  UserModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        res.status(401).send('Такого пользователя в базе нет');
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            res.status(401).send('Такого пользователя в базе нет');
          }

          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret', { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch(next);
};

// eslint-disable-next-line consistent-return
const createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(404).send({ message: 'Нет емейла, пароля или имени' });
  }
  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => UserModel.create({ email, name, password: hash }))
    .then(() => {
      res.status(200).send({ message: 'Пользователь создан' });
    })
    .catch(next);
};

module.exports = {
  getUser, patchProfile, login, createUser,
};

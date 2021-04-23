const mongoose = require('mongoose');

const isUrl = require('validator/lib/isURL');

const moviesSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (x) => isUrl(x),
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (x) => isUrl(x),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (x) => isUrl(x),
    },
  },
  owner: {
    required: true,
    type: mongoose.ObjectId,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movies', moviesSchema);

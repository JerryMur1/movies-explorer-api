const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },
  direction: {
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
      validator: (x) => /https?:\/\/w*[\da-zA-Z\W]+#?/g.test(x),
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (x) => /https?:\/\/w*[\da-zA-Z\W]+#?/g.test(x),
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (x) => /https?:\/\/w*[\da-zA-Z\W]+#?/g.test(x),
    },
  },
  owner: {
    required: true,
    type: mongoose.ObjectId,
  },
  movieId: {
    required: true,
    type: mongoose.ObjectId,
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

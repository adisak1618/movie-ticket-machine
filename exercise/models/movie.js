const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title:  String,
  poster: String,
  price: Number,
  youtube: String,
  description: String,
  type: String,
  createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('movies', movieSchema);
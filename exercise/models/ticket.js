const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  movie_id:  { type: Schema.ObjectId, ref: 'movies', required: true },
  email: { type: String, required: true },
  seat: Number,
  price: Number,
  showtime: String,
  createDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('tickets', ticketSchema);
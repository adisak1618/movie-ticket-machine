const mongoose = require('mongoose');
const express = require('express');
const movieModel = require('./../models/movie');
const ticketModel = require('./../models/ticket');
const { responseError, sendEmail } = require('../helper');
const router = express.Router();

router.get('/movies', (req, res) => {
  const { type, title, sort } = req.query;
  let condition = {};
  if (type) condition = { ...condition, type };
  if (title) condition = { ...condition, title: { $regex: title, $options: 'si' }};
  movieModel
    .find(condition)
    .sort({ price: sort === 'DESC' ? -1 : 1 })
    .exec((err, data) => {
      if(err) return responseError(res, 'finderror', err);
      res.json(data);
    });
});

router.get('/movies/:id', (req, res) => {
  movieModel.findById(req.params.id, (err, data) => {
    if(err) return responseError(res, 'finderror', err);
    res.json(data);
  });
});

router.post('/buy/:movie_id', async (req, res) => {
  try {
    const { email, seat, showtime } = req.body;
    const movie = await movieModel.findById(req.params.movie_id);
    const { title } = movie;
    if(!email) return responseError(res, 'emailisrequire', 'email is require');
    const ticket = await ticketModel.create({
      movie_id: movie._id,
      email,
      seat,
      showtime,
      price: Number(seat) * movie.price
    });
    const data = await sendEmail({
      from: 'adisakchaiyakul@gmail.com',
      to: email,
      subject: 'Your ticket is Here!!',
      html: `<div><h2>You just buy movie ticket!</h2><p>name: ${title}</p><p>amount: ${seat} seat</p><p>total: ${ticket.price}</p><p>ticket ID: ${ticket._id}</p></div>`
    });
    res.json(ticket);
  } catch ({ message}) {
    responseError(res, 'error', message);
  }
});

module.exports = router;
const mongoose = require('mongoose');
const express = require('express');
const movieData = require('./../models/movie');
const { responseError } = require('../helper');
const router = express.Router();

router.get('/movies', (req, res) => {
  const { type, title, sort } = req.query;
  let condition = {};
  if (type) condition = { ...condition, type };
  if (title) condition = { ...condition, title: { $regex: title, $options: 'si' }};
  movieData.find(condition).sort({ price: sort === 'DESC' ? -1 : 1 }).exec((err, data) => {
    if(err) return responseError(res, 'finderror', err);
    res.json(data);
  });
});

router.get('/movies/:id', (req, res) => {
  movieData.findById(req.params.id, (err, data) => {
    if(err) return responseError(res, 'finderror', err);
    res.json(data);
  });
});

module.exports = router;
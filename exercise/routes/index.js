const mongoose = require('mongoose');
const express = require('express');
const movieData = require('./../models/movie');
const { responseError } = require('../helper');
const router = express.Router();

router.get('/', (req, res) => {
  movieData.find({}, (err, data) => {
    // res.json(data);
    if(err) return responseError(res, 'finderror', err);
    res.json(data);
  });
});

module.exports = router;
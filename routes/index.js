
const express = require('express');
const router = express.Router(); // Use express.Router() correctly

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World');
});

router.use('/contacts', require('./contacts'));

module.exports = router;



/*
const router = require('./swagger');

const routes = require('express').Router();

routes.use('/', require('./swagger'));

app.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World');
});

router.use('/contacts', require('./contacts'));

module.exports = routes;
*/
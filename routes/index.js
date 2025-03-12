const routes = require('express').Router();
const jokes = require('../controllers/');

routes.get('/', jokes.displayJoke);
routes.get('/john', jokes.displayJohn);
routes.get('/richard', jokes.displayRichard);

module.exports = routes;



// new new

const express = require('express');

const professionalController = require('../controllers/professional');

const router = express.Router();

// GET /feed/posts
router.get('/', professionalController.getData);
// localhost:8080/professional/
module.exports = router;

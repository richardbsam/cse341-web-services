const routes = require('express').Router();
const jokes = require('../controllers/');

routes.get('/', jokes.displayJoke);
routes.get('/john', jokes.displayJohn);
routes.get('/richard', jokes.displayRichard);

module.exports = routes;

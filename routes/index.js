const router = require('./swagger');

const routes = require('express').Router();

routes.use('/', require('./swagger'));

app.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello World');
});

router.use('/contacts', require('./contacts'));

module.exports = routes;

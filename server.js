// express web server
const express = require('express');
const mongodb = require('./db/connect');

const app = express();
const port = process.env.PORT || 3000;



app.use('/', require('./routes'))





mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and listening on ${port}`);
  }
});

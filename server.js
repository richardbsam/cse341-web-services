const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const mongodb = require('./db/connect');
const routes = require('./routes/index'); // Import routes once

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use('/', routes); // Use routes correctly

// Initialize DB and Start Server
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // Exit process on DB failure
  } else {
    app.listen(port, () => {
      console.log(`✅ Connected to Database and listening on port ${port}`);
    });
  }
});




/*
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');

const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

// Root Route
const routes = require('./routes/index'); // Import your routes

app.use('/', routes); // Use the routes correctly

// Initialize DB and Start Server
mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`✅ Connected to Database and listening on port ${port}`);
    });
  }
});

*/
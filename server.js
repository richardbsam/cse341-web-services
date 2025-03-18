const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Root Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Corrected Route Import
app.use('/contacts', contactsRoutes);

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





/*
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');
const app = express();

const port = process.env.PORT || 3000;



// Root route to display "Hello World"
app.get('/', (req, res) => {
  res.send('Hello World');
});


// Contacts API routes
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/contacts', contactsRoutes);


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to Database and listening on ${port}`);
  }
});


*/
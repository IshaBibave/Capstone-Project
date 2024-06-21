// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: '*', // Allow all origins to access the API
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 204
};

// CORS Middleware
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

mongoose.connect('mongodb+srv://ibibave:ibibave@cluster0.mgu0ieb.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(3002, () => {
    console.log(`Server Running On Port 3002`);
  });
}).catch(err => {
  console.error('Database connection error', err);
});

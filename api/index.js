require('dotenv').config();

const express = require('express');
const mongoose = require("mongoose");
const app = express();
const cors = require('cors');

const PORT = 8080;
app.use(cors());
app.use(express.json({ limit: '10MB' }));

const connectDb = () => {
  return mongoose.connect(process.env.MONGODB_URL || 'mongodb://mongo:27017/survey-testing');
};

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
const express = require('express');
const mongoose = require('mongoose');
const { json, urlencoded } = require('body-parser');
const dotenv = require('dotenv');
const router = require('./src/routes/routes');

const app = express();
dotenv.config();
app.use(json());
app.use(urlencoded({ extended: true }));

const PORT = process.env.PORT || 9000;
const mongodbURL = process.env.MONGODB_URL;

mongoose.connect(
  mongodbURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log("successfully connected to the database");
});

app.use(express.static(__dirname + '/public_html'));
app.use(router);
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))
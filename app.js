
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config()
require('./db/mongoose')

const allRoutes = require('./routes/routes')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
  app.use(bodyParser.json());


app.use('/api/v1', allRoutes)

module.exports = app
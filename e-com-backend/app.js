require("dotenv/config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
if (process.env.NODE === "development") {
  app.use(morgan());
}

module.exports = app;

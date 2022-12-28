const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  if (process.env.NODE_ENV === "development") {
    app.use(morgan());
  }
};

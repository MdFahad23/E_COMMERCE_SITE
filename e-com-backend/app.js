require("express-async-errors");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const error = require("./middlewares/error");

const userRouter = require("./routers/userRouter");

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan());
}

app.use("/api/user", userRouter);

app.use(error);

module.exports = app;

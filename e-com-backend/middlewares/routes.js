const userRouter = require("../routers/userRouter");
const categoryRouter = require("../routers/categoryRouter");
const productRouter = require("../routers/productRouter");
const cartItemRouter = require("../routers/cartItemRouter");

module.exports = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/product", productRouter);
  app.use("/api/cart", cartItemRouter);
};

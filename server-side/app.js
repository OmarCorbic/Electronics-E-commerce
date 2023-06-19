require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const connectDB = require("./db/connect");
const products = require("./routes/products");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const express = require("express");
const app = express();

const port = 3000;
// middleware
app.use(express.json());
app.use(cors());
// routes
app.use("/api/v1/products", products);
// products middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, console.log(`Server listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

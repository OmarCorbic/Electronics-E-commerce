require("express-async-errors");
require("dotenv").config();

// security imports
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

// connectDB import
const connectDB = require("./db/connect");

// router imports
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");

// middleware imports
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

const express = require("express");
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// routes
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/auth", authRouter);

// error middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

start();

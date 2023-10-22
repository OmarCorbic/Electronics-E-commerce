require("express-async-errors");
require("dotenv").config();
const path = require("path");

// security imports
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

// connectDB import
const connectDB = require("./db/connect");

// router imports
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const paymentRouter = require("./routes/payment");

// middleware imports
const errorHandlerMiddleware = require("./middleware/error-handler");
// const notFoundMiddleware = require("./middleware/not-found");

const express = require("express");
const app = express();

// middleware
app.use(helmet());
app.use(express.json());
app.use(express.static(__dirname + "/build"));
app.use(cors());
app.use(cookieParser());

// routes
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/payment", paymentRouter);

// error middleware
app.use(errorHandlerMiddleware);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// app.use(notFoundMiddleware);

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

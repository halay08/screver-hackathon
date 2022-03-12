require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const router = require("./routes");
const ResponseUtil = require("./lib/response-util");

const PORT = 8080;
app.use(cors());
app.use(express.json({ limit: "10MB" }));

app.use("/", router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  const response = ResponseUtil.error(err);

  return res.status(err.status || 500).json(response);
});


const connectDb = () => {
  return mongoose.connect(
    process.env.MONGODB_URL
  );
};

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});

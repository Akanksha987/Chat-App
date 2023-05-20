require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/auth");
const app = express();
const socket = require("socket.io");

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoute);

mongoose
  .connect("mongodb://localhost:27017", {
    family: 4,
  })
  .then(() => {
    console.log("Successful");
  })
  .catch((err) => {
    console.log(err.message);
  });
const server = app.listen(5000, () => {
  console.log("Server is working");
});

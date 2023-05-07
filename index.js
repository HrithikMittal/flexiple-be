const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");

app.use("/user", userRoutes);
app.use("/post", postRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 4000");
});

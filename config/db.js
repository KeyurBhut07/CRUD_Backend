const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB server");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB server");
    console.log(err);
  });

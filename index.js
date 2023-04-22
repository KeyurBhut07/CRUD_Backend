const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");

const PORT = process.env.PORT || 1234;

//middleware
app.use(express.json());

app.use("/", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});

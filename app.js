const express = require("express");
const mongoose = require("mongoose");
const cli = require("nodemon/lib/cli");
const app = express();
const dotenv = require("dotenv");
const postRoute = require("./routes/posts");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/posts", postRoute);

//Database Connect
try {
  mongoose.connect(
    process.env.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Database Connected");
    }
  );

  app.listen(3000, () => {
    console.log("Server is running on port 3000 ...");
  });
} catch (error) {
  console.error(error);
}

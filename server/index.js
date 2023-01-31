const express = require("express");
const http = require('http');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require('./router');
const cors = require('cors');
const keys = require('./config/keys');

const app = express();

mongoose.set("strictQuery", false);

//*****NEED TO CHANGE THIS ONCE GETTING EVERYTHING COMPLETED (keys.MONGODB_URI) */
mongoose.connect("mongodb://127.0.0.1:27017/lsnails-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false,}));
app.use(bodyParser.json());

router(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  // it'll show the html file and it'll route from there the script and link tags... Then goes back to the router(app)...
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
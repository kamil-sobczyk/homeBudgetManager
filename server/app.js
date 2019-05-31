require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./index.js");
const { port } = require('./config');
const app = express();
const cors = require("cors");

const HOST = "localhost";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

routes(app);

app.listen(port, HOST);
console.log(`Running on http://${HOST}:${port}`);

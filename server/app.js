require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./index.js");
const { port } = require("./config");
const app = express();
const cors = require("cors");

const port = port;
const HOST = "localhost";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin: *");
  res.setHeader(
    "Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

routes(app);

app.listen(port, HOST);
console.log(`Running on http://${HOST}:${port}`);

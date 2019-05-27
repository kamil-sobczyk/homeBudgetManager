require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./index.ts");
const app = express();
const cors = require("cors");

const store = require('./store');

const PORT = 8080;
const HOST = "localhost";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  if (!store[req.headers.id]) {
    store[req.headers.id] = {
      items:[],
      selected:[],
      costs: []
    }
  }
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

routes(app);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

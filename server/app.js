require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./index.js");
const { port } = require("./config");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.listen(port);
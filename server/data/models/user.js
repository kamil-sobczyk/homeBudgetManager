const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  usr: String,
  items: Array,
  selected: Array,
  costs: Array,
  incomes: Array
});

module.exports = userSchema;

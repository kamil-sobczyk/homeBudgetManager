const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  items: Array,
  selected: Array,
  costs: Array
});

module.exports = { userSchema };

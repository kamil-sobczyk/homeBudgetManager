const mongoose = require('mongose');

const userSchema = new mongoose.Schema({
  items: Array,
  selected: Array,
  costs: Array
});

module.exports = { userSchema };

const mongoose = require('mongoose');

const gymPassSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
});

module.exports = mongoose.model('GymPass', gymPassSchema);
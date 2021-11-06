const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true}
})

// Name of table in database
module.exports = mongoose.model('Author', authorSchema);
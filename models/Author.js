const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
});

module.exports = mongoose.model("Author", AuthorSchema);
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  publishedYear: Number,
});

module.exports = mongoose.model("Book", BookSchema);
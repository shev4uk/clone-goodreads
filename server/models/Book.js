const mongoose = require("mongoose");

const Book = mongoose.model("Book", {
   title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = { Book };
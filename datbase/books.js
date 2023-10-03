const mongoose = require("mongoose");

//Create a book schema
const BookSchema = mongoose.Schema({
  ISBN: String,
  title: String,
  author: [Number],
  language: String,
  pubDate: String,
  numPage: Number,
  category: [String],
  publication: Number,
});
const bookModel = mongoose.model("book", BookSchema);
module.exports = bookModel;

const mongoose = require("mongoose");
const Book = require("./book");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

//Run this code before a remove method is called
authorSchema.pre("remove", function (next) {
  Book.find({ author: this.id }, (err, books) => {
    if (err) {
      //Can't find author
      next(err);
    } else if (books.length > 0) {
      //Author has books
      next(new Error("This author has books still"));
    } else {
      //No erros, remove author
      next();
    }
  });
});

// Name of table in database
module.exports = mongoose.model("Author", authorSchema);

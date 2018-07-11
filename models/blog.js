var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  body: String,
  date: String,
});

module.exports = mongoose.model('Blog', blogSchema);

var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema ({
  title: String,
  author: String,
  image: String,
  body: String,
  tags: String
});

module.exports = new mongoose.model('Blog', blogSchema);

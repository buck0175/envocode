var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  author: String,
  body: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Blog', blogSchema);

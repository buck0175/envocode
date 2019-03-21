// =====================
// App Requirements
// =====================


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const localStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

// Mongoose Database
// mongoose.connect('mongodb://localhost/envocode');

var app = express();

// Sets the view engine to EJS rather than HTML
app.set('view engine', 'ejs');

// Serves the custom stylesheets
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// ROUTES
app.get('/', function(req, res){
  res.render('index');
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact');
});

app.get('/portfolio', function(req, res){
  res.render('portfolio');
});



app.listen(process.env.PORT, process.env.IP, function(){
  console.log('server started!');
});


// app.listen(3333, () => {
//   console.log('http://www.localhost:${3333}');
// });

// =====================
// App Requirements
// =====================

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

var Blog = require('./models/blog.js');
var User = require('./models/user.js');



var app = express();

// Mongoose Database
// mongoose.connect('mongodb://localhost/envocode');

mongoose.connect('mongodb://envocode:@ds141960.mlab.com:41960/envocode');





// Setting the view engine to EJS
app.set('view engine', 'ejs');

// Serves the custom stylesheets
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));


// Local Variables


// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: "Salwa is so beautiful",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// =================
// ROUTES
// =================

// Index Route
app.get('/', function(req, res){
  Blog.find({}, function(err, blog){
    if(err){
      console.log(err);
    } else {
      console.log(blog);
      res.render('index', {blog: blog});
    }
  })

});

// Showcase ROUTE

app.get('/showcase', function(req, res){
  res.render('showcase/showcase');
})

// Blog Route


// Products ROUTE

app.get('/products', function(req, res){
  res.render('products');
});

// Showroom ROUTE

app.get('/showroom', function(req, res){
  res.render('showroom');
});

// Prices ROUTES
app.get('/prices', function(req, res){
  res.render('prices');
});

// =====================
// BLOG RESTFUL ROUTES
// =====================

// Retreives The Main Blog Route
app.get('/blog', function(req, res){
  Blog.find({}, function(err, blog){
    if(err){
      console.log(err);
      res.redirect('/');
    } else {
      res.render('blog/blog', {blog: blog});
    }
  });
});

// Retreives The Blog Post Form
app.get('/blog/new', function(req, res){
  res.render('blog/new');
});

// Posts New Entries From The Form
app.post('/blog', function(req, res){
  Blog.create(req.body.blog, function(err, blog){
    if(err){
      console.log(err);
      res.redirect('/blog/new');
    } else {
      res.redirect('/blog/' + blog._id);
    }
  });
});

// Displays the show page for individual blog posts
app.get('/blog/:id', function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      console.log(err);
      res.redirect('/blog');
    } else {
      res.render('blog/show', {blog: blog});
    }
  });
});

// Shows Edit form

// Puts edit form


// Removes blog posts
app.delete("/blog/:id", function(req, res){
  Blog.findByIdAndDelete(req.params.id, function(err, blog){
    if(err){
      console.log(err);
      res.redirect('/blog');
    } else {
      res.redirect('/blog');
    }
  });
});

// =====================
// PASSPORT ROUTES
// =====================


// Register Form
app.get('/register', function(req, res){
  res.render('register');
});

// Register Post Request
app.post('/register', function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect('/');
    });
  });
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post("/login", passport.authenticate("local",
  {
    successRedirect: "/",
    failureRedirect: "/login"
  }), function(req, res){

});

app.get('/logout', isLoggedIn, function(req, res){
  req.logout();
  res.redirect('/photos');
});

// =====================
// PRICING ROUTES
// =====================

app.get('/pricing', function(req, res){
  res.render('prices');
});

// =====================
// SUPPORT ROUTES
// =====================

app.get('/support', function(req, res){
  res.render('support');
});




// Dashboard Routes





// Logged In function

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}


// =================
// Server Starter
// =================

app.listen(process.env.PORT, process.env.IP, function(){
  console.log('server started!');
});

// app.listen(3333, () => {
//     console.log('http://localhost:${3333}');
// });

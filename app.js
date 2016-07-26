'use strict';

 // Load module dependencies
var config = require('./config');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var body = require('body-parser');
var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

// These callbacks are required by passport auth.
// Here we choose to serialize the entire user object given by the Azure AD strategy
// into the session, so that it is available in our routes as req.user.  Instead you could
// serialize only the user's ID, store their profile data server side, and look it up here.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Configure Express
var app = express();

// Configure necessary middleware - we recommend reading up on the session middleware options.
app.set('view engine', 'ejs');
app.use(body());
app.use(session({ secret: 'myreallyimportantandsecuresecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configure an Azure AD strategy for each of the policies used in the app
passport.use('b2c-sign-in', new OIDCStrategy({

    // Set up the strategy with the proper config
    callbackURL: config.azuread.redirectUri.concat('/sign-in'),
    clientID: config.azuread.clientID,
    identityMetadata: config.azuread.identityMetadata,
    tenantName: config.azuread.tenantName,
    responseType: 'id_token',
    responseMode: 'form_post',
    validateIssuer: true
  },

  // After the Azure AD strategy authenticates the user, create the user in express from the profile
  function(iss, sub, profile, accessToken, refreshToken, done) {
    return done(null, profile);
  }
));

// Do the same as above, but this time for the sign up policy
passport.use('b2c-sign-up', new OIDCStrategy({
    callbackURL: config.azuread.redirectUri.concat('/sign-up'),
    clientID: config.azuread.clientID,
    identityMetadata: config.azuread.identityMetadata,
    tenantName: config.azuread.tenantName,
    responseType: 'id_token',
    responseMode: 'form_post',
    validateIssuer: true
  },
  function(iss, sub, profile, accessToken, refreshToken, done) {
    return done(null, profile);
  }
));

// One more strategy for profile editing
passport.use('b2c-edit-profile', new OIDCStrategy({
    callbackURL: config.azuread.redirectUri.concat('/edit-profile'),
    clientID: config.azuread.clientID,
    identityMetadata: config.azuread.identityMetadata,
    tenantName: config.azuread.tenantName,
    responseType: 'id_token',
    responseMode: 'form_post',
    validateIssuer: true
  },
  function(iss, sub, profile, accessToken, refreshToken, done) {
    return done(null, profile);
  }
));

// A basic helper method for checking authentication state
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

// Home page, which does not require authentication
app.get('/', function(req, res){
  res.render('index', { user: req.user, config: config.azuread });
});

// Account page, which does require authentication
app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user, config: config.azuread });
});

// Login route which invokes the Azure AD B2C strategy with the appropriate policy.
app.use('/sign-in', passport.authenticate('b2c-sign-in', { 
  failureRedirect: '/', 
  successRedirect: '/account' 
}));

// Login route which invokes the Azure AD B2C strategy with the appropriate policy.
app.use('/sign-up', passport.authenticate('b2c-sign-up', { 
  failureRedirect: '/', 
  successRedirect: '/account' 
}));

// Login route which invokes the Azure AD B2C strategy with the appropriate policy.
app.use('/edit-profile', passport.authenticate('b2c-edit-profile', { 
  failureRedirect: '/', 
  successRedirect: '/account' 
}));

// Logout route which only drops the user's local session
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);
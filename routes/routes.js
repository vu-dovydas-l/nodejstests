const passport = require('passport');
const express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('../view/index.ejs');
});

router.get('/profile', isLoggedIn, function (req, res) {
  console.log(req.user);
  res.render('../view/profile.ejs', {
    user: req.user
  });
});

router.get('/logout', function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Auth ---

/**
 * Facebook auth
 */
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

/**
 * Google auth
 */
router.get('/auth/google', passport.authenticate('google', {
  scope: ['email']
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

/**
 * Check if logged
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns next|redirect
 */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;
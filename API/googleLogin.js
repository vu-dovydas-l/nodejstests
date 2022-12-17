const passport = require('passport');
const config = require('../config/config')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


passport.use(new GoogleStrategy({
    clientID:     config.googleAuth.clientID,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackURL
  }, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

module.exports = passport;
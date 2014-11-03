var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var models = require('./models');

var router = express.Router();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  function(accessToken, refreshToken, profile, done) {
    models.User.findOneAndUpdate(
      // find by oauthID or email
      {$or:[
        {oauthID: profile.id},
        {email: profile.emails[0].value}
      ]},
      // update email if not present yet
      {email: profile.emails[0].value},
      function(err, user) {
      if (err) {
        // Probably let the user know he can't login
      } else if (user !== null) {
        // let the user know he's logged in
        done(err, user);
      }
    });
  }
));


router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login',
}));


module.exports = router;

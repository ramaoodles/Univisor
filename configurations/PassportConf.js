'use strict';

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
;

passport.use(new LocalStrategy(  
 function(username, password, done) {
    domain.User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!true) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;  
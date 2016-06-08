'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;;

passport.use(new LocalStrategy(
  function(username, password, done) {
    domain.User.findOne({
      email: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user == null) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      var response = matchEncryptedPassword(password, user);
      if (!matchEncryptedPassword(password, user)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
        // return done(null,{ message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

var matchEncryptedPassword = function(password, user) {
    var encryptedPassword = crypto.createHmac('sha1', user.salt).update(password.toString()).digest('hex');
    if (user.password == encryptedPassword) {
      return true;
    } else {
      return false;
    }
  }
  // below used clientId and clientSecret for social signup are subjected to change

passport.use(new FacebookStrategy({
    clientID: "1064988543557341",
    clientSecret: "d800256297053f13a947ad631f08f170",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ["id", "email", "first_name", "last_name"]
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile._json);
    passport.serializeUser(function(user, done) {
      done(null, user);
    });
    domain.User.findOne({
      email: profile._json.email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (user == null) {
        var salt = uuid.v1();
        var user = domain.User({
          "firstName": profile._json.first_name,
          "lastName": profile._json.last_name,
          "email": profile._json.email,
          "password": "no password for social signup",
          "salt": salt, // added due to validation issue
          "role": "ROLE_USER"
        });
        user.save(function(err, userObj) {
          if (err) {
            return done(err);
          }
          console.log("toward next-->");
          return done(null, userObj);
        });

      } else {
        console.log("toward next-->");
        return done(null, user);
      }
    });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: "HjRal9KZxVQJI2MWOS2AX2JDy",
    consumerSecret: "qHWd3Y2vxWNKfM9x4MxSeqwxz8i3HiwtWYmw9BXK8m37wxzjkD",
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
    console.log(profile);
    domain.User.findOne({
      email: profile.email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      authenticate(user, profile);
    });
  }
));
passport.use(new GoogleStrategy({
    clientID: "336085008976-r378d3a6srq0ge8te3iq9628elbtbn7p.apps.googleusercontent.com",
    clientSecret: "KWr94QbIBcJ9Tqwfkl4rMcni",
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    domain.User.findOne({
      email: profile.email
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      authenticate(user, profile);
    });
  }
));

var authenticate = function(user, profile, done) {
  if (user == null) {
    var user = domain.User({
      "firstName": profile.fistname,
      "lastName": profile.lastname,
      "email": profile.email,
      "role": "ROLE_USER"
    });
    user.save(function(err, userObj) {
      if (err) {
        return done(err);
      }
    });
    return done(null, userObj);
  } else {
    return done(null, user);
  }
}
module.exports = passport;

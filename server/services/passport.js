const passport = require('passport');
const Employee = require("../models/employee");
const keys = require('../config/keys');

const ExtractJwt = require('passport-jwt').ExtractJwt;
const JwtStrategy = require('passport-jwt').Strategy;

const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password
  // call done and return the user
  // otherwise, call done with false
  Employee.findOne({ email: email }, function(err, employee){
    if ( err ) { return done(err); }
    if ( !employee ) { return done( null, false )}

    if( !employee.validPassword( password ) ) {
      return done( null, false, { message: 'Incorrect password.' })
    }

    return done( null, user );
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // Check if user ID in payload exists in DB
  // If true then 'call' done w/ user
  // otherise, call done without false

  Employee.findbyId(payload.sub, function(err, user) {
    if (err) { return done(err, false) }

    if(user) {
      done(null, user)
    } else {
      done(null, false)
    }
  });
});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin)

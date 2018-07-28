const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("./models/User");
const keys = require("./config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

const passportHandler = () => {
  passport.use(
    "JwtStrategy",
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => console.log(err));
    })
  );
};

module.exports = passportHandler;

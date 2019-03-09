const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/Users');

passport.use(new LocalStrategy({
  usernameField: 'pseudo',
  passwordField: 'code',
  passReqToCallback: true,
},
(req, username, password, done) => {
  console.log(req);
  if (password === process.env.APP_PASSWORD || password === process.env.APP_PASSWORD_MANAGER) {
    console.log(req);
    let user = Users.get({ pseudo: username });

    if (!user.pseudo) {
      // create user
      const newUser = new Users(req.body);

      // set user fullname (<firstName_lastName> to lowercase)
      newUser.setFullName();

      // Put user in dynamodb table
      user = newUser.save();
    }

    return done(null, user);
  }
  return done(null, false, { message: 'Incorrect password.' });
}));

passport.serializeUser((user, cb) => {
  console.log(user, 'jhkshjkdhjkhkjdhjkhjks');
  cb(null, user.pseudo);
});

passport.deserializeUser((pseudo, cb) => {
  console.log(pseudo, 'jhkshjkdhjkhkjdhjkhjksaaaaaaaas');
  Users.get({ pseudo }, (err, user) => {
    cb(err, user);
  });
});

module.exports = passport;

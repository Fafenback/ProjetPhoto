const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/Users');

passport.use(new LocalStrategy({
  usernameField: 'pseudo',
  passwordField: 'code',
  passReqToCallback: true,
},
async (req, username, password, done) => {
  const isAdmin = password === process.env.APP_PASSWORD_MANAGER;
  if (password === process.env.APP_PASSWORD || isAdmin) {
    let user = await Users.get(username);

    if (!user) {
      // create user
      const { firstname, lastname, pseudo } = req.body;
      const newUser = new Users({
        firstname,
        lastname,
        pseudo,
        isAdmin,
      });

      // set user fullname (<firstName_lastName> to lowercase)
      await newUser.setFullName();

      // Put user in dynamodb table
      user = await newUser.save();
    }

    return done(null, user);
  }
  return done(null, false, { message: 'Incorrect password.' });
}));

passport.serializeUser((user, cb) => {
  cb(null, user.pseudo);
});

passport.deserializeUser((pseudo, cb) => {
  Users.get({ pseudo }, (err, user) => {
    cb(err, user);
  });
});

module.exports = passport;

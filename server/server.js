require('dotenv').config();
// Hack solve issue with dynamoose XXX config region is missing
process.env.AWS_REGION = 'eu-west-1';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpack = require('webpack');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const webpackConfig = require('../webpack.config');
const apiRes = require('./lib/apiResponse');

const app = express();

const compiler = webpack(webpackConfig);


// webpack hmr
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    stats: true,
  }),
);

app.use(require('webpack-hot-middleware')(compiler));


// SETTINGS PARSER CORS etc.
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
}));

const passport = require('./lib/passport');

app.use(passport.initialize());
app.use(passport.session());

// Serve static dir
app.use(express.static(path.resolve(__dirname, '../src/public')));

// Router
const picturesRoads = require('./routes/picturesRoad');
const usersRoads = require('./routes/usersRoad');

app.post('/auth', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(500).json({ error, success: false });
    }
    if (!user) {
      res.status(401).json({ error: info.message, success: false });
    }
    req.logIn(user, (err) => {
      if (error) {
        res.status(500).json({ error: err, success: false });
      }
      res.status(200).json({ user, success: true });
    });
  })(req, res, next);
});

app.use('/users', usersRoads);
app.use('/pictures', picturesRoads);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/public/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('fucking you bitch !!!');
});

require('dotenv').config();

process.env.AWS_REGION = 'eu-west-1';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const webpack = require('webpack');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./lib/passport');
const webpackConfig = require('../webpack.config');

const app = express();

// Hack solve issue with dynamoose XXX config region is missing

const compiler = webpack(webpackConfig);

// SETTINGS PARSER CORS etc.
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Serve static dir
app.use(express.static(path.resolve(__dirname, '../src/public')));

// Router
const picturesRoads = require('./routes/picturesRoad');
const usersRoads = require('./routes/usersRoad');

app.post('/auth',
  passport.authenticate('local', {
    successRedirect: '/kjdfgdljkf',
    failureRedirect: '/',
  }));
app.use('/users', usersRoads);
app.use('/pictures', picturesRoads);


// webpack hmr
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    stats: true,
  }),
);

app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/public/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('fucking you bitch !!!');
});

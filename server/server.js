require('dotenv').config();
// Hack solve issue with dynamoose XXX config region is missing
process.env.AWS_REGION = 'eu-west-1';

const socket = require('socket.io');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const aws = require('aws-sdk');
const s3Storage = require('multer-sharp-s3');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

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
app.use(
  session({
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
  }),
);

const passport = require('./lib/passport');

app.use(passport.initialize());
app.use(passport.session());

// Serve static dir
app.use(express.static(path.resolve('../dist')));

// Router
const picturesRoads = require('./routes/picturesRoad');
const usersRoads = require('./routes/usersRoad');

const socketApp = require('http').createServer(app);

const io = socket(socketApp);
io.on('connection', (client) => {
  console.log('coucou');
  client.on('uploaded', (data) => {
    console.log(data);
    console.log('fuckoff');
  });
});
app.post('/auth', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(500).json({ error, success: false });
    }
    if (!user) {
      res.status(200).json({ error: info.message, success: false });
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

const creds = new aws.SharedIniFileCredentials({ profile: 'fafenback' });
const s3 = new aws.S3({
  credentials: creds,
});
const storage = s3Storage({
  Key: (req, file, cb) => {
    crypto.pseudoRandomBytes(16, (err, raw) => {
      cb(err, err ? undefined : raw.toString('hex'));
    });
  },
  s3,
  Bucket: 'fafenback-pictures-project',
  multiple: true,
  resize: [{ suffix: 'lg', width: 800, height: null }, { suffix: 'original' }],
});

const upload = multer({ storage });

app.post('/upload', upload.single('photos'), (req, res) => {
  const data = Object.keys(req.file).reduce((acc, el, key) => {
    if (typeof req.file[el] === 'string') {
      return { ...acc, [el]: `${req.file[el]}` };
    }
    return {
      ...acc,
      [el]: {
        Location: req.file[el].Location,
        width: req.file[el].width,
        height: req.file[el].height,
        size: req.file[el].size,
        type: req.file[el].ContentType,
      },
    };
  }, {});
  res.status(200).json(data);
});

app.get('/apidoc', (req, res) => {
  res.sendFile(path.resolve('../apidoc/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve('../dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('fucking you bitch !!!');
});

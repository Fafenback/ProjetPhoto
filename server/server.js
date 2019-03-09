const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const app = express();

// Hack solve issue with dynamoose XXX config region is missing
process.env.AWS_REGION = 'eu-west-1';

const compiler = webpack(webpackConfig);

// SETTINGS PARSER CORS etc.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// webpack hmr
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    stats: true,
  }),
);

app.use(require('webpack-hot-middleware')(compiler));

// Serve static dir
app.use(express.static(path.resolve(__dirname, '../src/public')));

// Router
const picturesRoads = require('./routes/picturesRoad');
const usersRoads = require('./routes/usersRoad');

app.use('/users', usersRoads);
app.use('/pictures', picturesRoads);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/public/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('fucking you bitch !!!');
});

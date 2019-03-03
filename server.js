const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('../webpack.config');

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

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/public/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('fucking you bitch !!!');
});

const dynamoose = require('dynamoose');
const sanitizeHtml = require('sanitize-html');

const { Schema } = dynamoose;

const isDev = process.env.NODE_ENV === 'development';

const picturesSchema = new Schema({
  pictureId: {
    type: String,
    required: true,
    hashKey: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
    set(v, cb) {
      cb(sanitizeHtml(v));
    },
  },
  comment: {
    type: String,
    trim: true,
    set(v, cb) {
      cb(sanitizeHtml(v));
    },
  },
  fullName: {
    type: String,
    trim: true,
    required: true,
  },
  pseudo: {
    type: String,
    trim: true,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
},
{
  create: true, // Create table in DB, if it does not exist,
  update: true,
  saveUnknown: isDev,
  errorUnknown: isDev,
  timestamps: true,
  throughput: { read: 5, write: 5 },
});

module.exports = dynamoose.model('Pictures', picturesSchema);

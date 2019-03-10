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
  downloadLink: {
    type: String,
    trim: true,
    required: true,
  },
  link: {
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
  waitForActive: true, // Wait for table to be created before trying to use it
  streamOptions: { // sets table stream options
    enabled: true, // sets if stream is enabled on the table
    type: 'NEW_IMAGE', // sets the stream type (NEW_IMAGE | OLD_IMAGE | NEW_AND_OLD_IMAGES | KEYS_ONLY)
  },
  defaultReturnValues: 'ALL_NEW',
});

module.exports = dynamoose.model('Pictures', picturesSchema);

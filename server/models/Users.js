const dynamoose = require('dynamoose');
const sanitizeHtml = require('sanitize-html');
const uuid = require('uuid/v4');

const { Schema } = dynamoose;

const isDev = process.env.NODE_ENV === 'development';

const usersSchema = new Schema({
  pseudo: {
    type: String,
    trim: true,
    required: true,
    hashKey: true,
  },
  firstname: {
    type: String,
    trim: true,
    required: true,
    set(value) {
      const v = sanitizeHtml(value);
      return v.charAt(0).toUpperCase() + v.slice(1);
    },
  },
  lastname: {
    type: String,
    trim: true,
    required: true,
    set(value) {
      const v = sanitizeHtml(value);
      return v.charAt(0).toUpperCase() + v.slice(1);
    },
  },
  fullname: {
    type: String,
    trim: true,
    lowercase: true,
  },
  userId: {
    type: String,
    required: true,
    default: uuid,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
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

usersSchema.methods.setFullName = function setFullName() {
  this.fullname = `${this.firstname}_${this.lastname}`;
};

module.exports = dynamoose.model('User', usersSchema);

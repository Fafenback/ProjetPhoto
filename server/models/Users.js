const dynamoose = require('dynamoose');
const sanitizeHtml = require('sanitize-html');
const uuid = require('uuid/v4');

const { Schema } = dynamoose;

const isDev = process.env.NODE_ENV === 'development';

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    hashKey: true,
    default: uuid,
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
    set(value) {
      const v = sanitizeHtml(value);
      return v.charAt(0).toUpperCase() + v.slice(1);
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
    set(value) {
      const v = sanitizeHtml(value);
      return v.charAt(0).toUpperCase() + v.slice(1);
    },
  },
  fullName: {
    type: String,
    trim: true,
    lowercase: true,
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

userSchema.methods.setFullName = function setName() {
  this.fullName = `${this.firstName}_${this.lastName}`;
};

module.exports = dynamoose.model('Users', userSchema);

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: false,
    },
    birthday: { type: Date },
    img: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    banned: {
      type: String,
      enum: ['active', 'banned'],
      default: 'active',
      required: true,
    },
    banduration: {
      type: String,
      enum: ['', '2 months', '4 months', '6 months', '1 year', 'permanent'],
      default: '',
    },
    reason: {
      type: String,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    resetCode: {
      type: String,
      required: false,
    },
    cover: {
      type: String,
    },
    followers: [],
    following: [],
    clubs: [],
    isClubAdmin: {
      type: Boolean,
      default: false,
    },
    points: {
      type: Number,
      required: false,
      default: 0,
    },
    eventsAttended: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

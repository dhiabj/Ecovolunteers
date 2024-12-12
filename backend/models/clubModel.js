const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    cover: {
      type: String,
    },
    userId: {
      //type: mongoose.Schema.Types.ObjectId,
      type: String,
      ref: 'User',
      required: true,
    },
    privacy: { type: String, enum: ['public', 'private'], default: 'public' },
    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        _id: false,
      },
    ],
    rules: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    joinRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ClubModel = mongoose.model('Clubs', clubSchema);

module.exports = ClubModel;

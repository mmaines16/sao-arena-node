var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  username: {
    type: String,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  profile: {
    characters: [
      {
        type: Schema.ObjectId,
      },
    ],
    wins: {
      type: Number,
      min: 0
    },
    losses: {
      type: Number,
      min: 0
    },
    winstreak: {
      type: Number,
      min: 0
    },
    picture: Buffer
  }
});

module.exports = mongoose.model('user', userSchema);
module.exports.Schema = userSchema;

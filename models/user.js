var bcrypt = require('bcrypt');
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
    picture_url: String,
  }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', userSchema);
module.exports.Schema = userSchema;

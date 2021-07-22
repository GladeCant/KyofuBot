const { model, Schema } = require('mongoose');

const userSchema = Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  userName: String,
  xp: Number,
  hp: {
    level: Number,
    max: Number
  },
  coins: Number,
  items: Array,
  profile: {
    color: String
  },
  position: String,
  quests: Object
});

module.exports = model('User', userSchema);

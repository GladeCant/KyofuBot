const { model, Schema } = require('mongoose');

const memberSchema = Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  userID: String,
  userName: String,
  warns: Array
});

module.exports = model('Member', memberSchema);

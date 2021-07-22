const { model, Schema } = require('mongoose');

const guildSchema = Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String
});

module.exports = model('Guild', guildSchema);

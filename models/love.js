const { model, Schema } = require('mongoose');

const loveSchema = Schema({
  _id: Schema.Types.ObjectId,
  users: String,
  level: String
});

module.exports = model('Love', loveSchema);

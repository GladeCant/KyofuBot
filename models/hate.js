const { model, Schema } = require('mongoose');

const hateSchema = Schema({
  _id: Schema.Types.ObjectId,
  users: String,
  level: String
});

module.exports = model('Hate', hateSchema);

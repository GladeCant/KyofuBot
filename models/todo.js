const { model, Schema } = require('mongoose');

const todoSchema = Schema({
  _id: Schema.Types.ObjectId,
  userID: String,
  userName: String,
  list: Array
});

module.exports = model('Todo', todoSchema);

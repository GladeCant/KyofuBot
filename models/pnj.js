const { model, Schema } = require('mongoose');

const pnjSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  color: String,
  img: String,
  dialogs: Array
});

module.exports = model('Pnj', pnjSchema);

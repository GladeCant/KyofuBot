const { model, Schema } = require('mongoose');

const itemSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  price: Number,
  receivedXP: Number,
  stock: Number, // -1 = no limit
  requiredLevel: Number,
  description: String,
  toUse: String
});

module.exports = model('Item', itemSchema);

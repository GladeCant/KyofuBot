const { model, Schema } = require('mongoose');

const zoneSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  movingPossibilities: Array,
  store: Array,
  description: String,
  img: String,
  fishing: Array
});

module.exports = model('Zone', zoneSchema);

const { MessageEmbed } = require('discord.js');
const { model, Schema } = require('mongoose');

const guildSchema = Schema({
  _id: Schema.Types.ObjectId,
  guildID: String,
  guildName: String,
  prefix: String,
  join: {
    channel: String,
    message: Schema.Types.Mixed
  },
  leave: {
    channel: String,
    message: Schema.Types.Mixed
  }
});

module.exports = model('Guild', guildSchema);

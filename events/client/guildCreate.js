const { Guild } = require('discord.js');
const Client = require('../../struct/Client');

/**
 * The guildCreate event, emitted when the bot join a new guild.
 * @param {Client} client
 * @param {Guild} guild
 */
module.exports = async (client, guild) => {
  const { defaultSettings: options } = require('../../util/config');

  await client.createGuild(guild, options);
}

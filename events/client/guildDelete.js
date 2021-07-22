const { Guild } = require('discord.js');
const Client = require('../../struct/Client');

/**
 * The guildDelete event, emitted when the bot leave a guild.
 * @param {Client} client
 * @param {Guild} guild
 */
module.exports = async (client, guild) => {
  await client.deleteGuild(guild);
}

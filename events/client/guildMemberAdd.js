const { GuildMember } = require('discord.js');
const Client = require('../../struct/Client');

/**
 * The guildMemberAdd event, emitted when a member join a guild.
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member) => {
  const { join } = await client.getGuild(member.guild);

  if (join.channel === null || join.message === null) return;

  const { replaceTags } = client.helper;

  client.channels.cache.get(join.channel).send(typeof join.message === 'object' ? { embed: replaceTags(join.message, member, member.guild) } : replaceTags(join.message, member, member.guild));
}

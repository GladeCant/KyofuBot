const { GuildMember } = require('discord.js');
const Client = require('../../struct/Client');

/**
 * The guildMemberRemove event, emitted when a member leave a guild.
 * @param {Client} client
 * @param {GuildMember} member
 */
module.exports = async (client, member) => {
  const { leave } = await client.getGuild(member.guild);

  if (leave.channel === null || leave.message === null) return;

  const { replaceTags } = client.helper;

  client.channels.cache.get(leave.channel).send(typeof leave.message === 'object' ? { embed: replaceTags(leave.message, member, member.guild) } : replaceTags(leave.message, member, member.guild));
}

const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'warn',
  usage: 'warn [membre] [raison]',
  description: 'Ajoute un avertissement à un membre.',
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/2556/2556946.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.inlineReply("<:unchecked:860839603098877953> • Vous ne possédez pas la permission d'avertir des membres. (Requis : `Expulser des membres`.)");

    if (!args.length) return client.sendHelpPage(this.name, message);

    const member = client.detectMember(message, args[0]);
    if (!member) return message.inlineReply('<:unchecked:860839603098877953> • Membre spécifié invalide.');

    const reason = args.slice(1).join(' ');

    let mbr = await client.getMember(member, message.guild);
    if (!mbr) {
      await client.createMember(member, message.guild, { warns: [] });
      mbr = await client.getMember(member, message.guild);
    }

    const memberWarns = mbr.warns || [];
    memberWarns.push({
      reason: reason || 'Pas de raison spécifiée',
      by: message.author.id
    });

    await client.updateMember(member, message.guild, { warns: memberWarns });
    message.channel.send(`⚠️ • **${member.user.username}** a été averti par **${message.author.username}** ${reason ? `pour la raison \`${reason}\` !` : '!'}`);
  }
};

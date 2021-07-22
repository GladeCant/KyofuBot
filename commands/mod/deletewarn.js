const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'deletewarn',
  aliases: ['delwarn', 'warndelete', 'removewarn'],
  usage: 'deletewarn [membre] [numéro]',
  description: "Supprime un avertissement d'un membre.",
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/4080/4080842.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.inlineReply("<:unchecked:860839603098877953> • Vous ne possédez pas la permission d'avertir des membres, et donc de gérer leurs avertissements. (Requis : `Expulser des membres`.)");

    if (!args.length) return client.sendHelpPage(this.name, message);

    const member = client.detectMember(message, args[0]);
    if (!member) return message.inlineReply('<:unchecked:860839603098877953> • Membre spécifié invalide.');

    const number = parseInt(args[1]);
    if (isNaN(number)) return message.inlineReply('<:unchecked:860839603098877953> • Invalide numéro spécifié.');

    let mbr = await client.getMember(member, message.guild)
    if (!mbr) {
      await client.createMember(member, message.guild);
      mbr = await client.getMember(member, message.guild);
    }

    const memberWarns = mbr.warns || [];

    if (number === 0) return message.inlineReply('<:unchecked:860839603098877953> • Très drôle.');
    if (number > memberWarns.length) return message.inlineReply(`<:unchecked:860839603098877953> • Le membre ne possède pas de warn portant le numéro **${number}**.`);

    const warnReason = memberWarns[number - 1].reason;
    memberWarns.splice(memberWarns.indexOf(mbr.warns[number - 1]), 1);

    await client.updateMember(member, message.guild, { warns: memberWarns });
    message.channel.send(`<:checked:860839605015412776> • Le warn **n°${number}** (${warnReason == 'Pas de raison spécifiée' ? 'aucun motif' : `\`${warnReason}\``}) a  bien été retiré !`);
  }
};

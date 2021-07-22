const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'checkwarns',
  aliases: ['warns'],
  usage: 'checkwarns [membre]',
  description: "Envoie la liste des avertissements d'un membre, l'utilisateur les lui ayant mis et leur raison.",
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/4899/4899458.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args, settings) {
    if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.inlineReply("<:unchecked:860839603098877953> • Vous ne possédez pas la permission d'avertir des membres, et donc de gérer leurs avertissements. (Requis : `Expulser des membres`.)");

    if (!args.length) return client.sendHelpPage(this.name, message);

    const member = client.detectMember(message, args);
    if (!member) return message.inlineReply('<:unchecked:860839603098877953> • Membre spécifié invalide.');

    let mbr = await client.getMember(member, message.guild)
    if (!mbr) {
      await client.createMember(member, message.guild);
      mbr = await client.getMember(member, message.guild);
    }

    const memberWarns = mbr.warns || [];
    let warnsList = '';
    for (let i = 0; memberWarns.length > i; i++) {
      warnsList += `**${i + 1}** • __${client.users.cache.get(mbr.warns[i].by).username}__ : ${mbr.warns[i].reason}\n`
    }

    const embed = new MessageEmbed()
      .setColor(member.roles.highest.color || '')
      .setTitle(`Avertissements du membre ${member.user.tag} :`)
      .setDescription(`${warnsList.length !== 0 ? `${warnsList}\n\nPour supprimer un warn, faites \`${settings.prefix}deletewarn [membre] [numéro]\`.` : "*Cet utilisateur ne possède pas d'avertissement.*"}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

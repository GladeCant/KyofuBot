const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'avatar',
  usage: 'avatar <user>',
  description: "Envoie l'image de ta photo de profil ou de celle d'un autre utilisateur.",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/4880/4880219.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = args.length ? client.detectMember(message, args) : message.member;
    if (!member) return message.inlineReply('<:unchecked:860839603098877953> • Membre spécifié invalide.');

    const { avatar } = client.helper;

    const embed = new MessageEmbed()
      .setColor(member.roles.highest.color || '')
      .setTitle(`📸 • Avatar d${client.helper.vowels.includes(member.user.tag.toLowerCase()[0]) ? "'" : 'e '}${member.user.tag} :`)
      .setDescription(`[webp](${avatar(member, 'webp', false)}) • [png](${avatar(member, 'png', false)}) • [jpg](${avatar(member, 'jpg', false)}) • [jpeg](${avatar(member, 'jpeg', false)})${member.user.avatar.startsWith('a_') ? ` • [gif](${avatar(member, 'gif', true)})` : ''}`)
      .setImage(avatar(member, 'png', true))
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

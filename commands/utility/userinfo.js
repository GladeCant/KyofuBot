const { Message } = require('discord.js');
const MessageEmbed = require('../../struct/MessageEmbed');
const Client = require('../../struct/Client');
const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'infouser', 'iu'],
  usage: 'userinfo <membre>',
  description: "Donne les informations suivantes sur un utilisateur : \n• Pseudo \n• ID \n• Surnom \n• Date de création \n• Date d'arrivée sur le serveur\n• Statut de présence \n• Plateforme \n• Dernier message envoyé\n• Date de début de boost (si le membre a boosté le serveur)\n• Rôles",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/4406/4406349.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = args.length ? client.detectMember(message, args) : message.member;
    if (!member) return message.inlineReply('<:unchecked:860839603098877953> • Membre spécifié invalide.');
    const user = member.user;

    const bot = user.bot ? '<:BOT:860850410344808458>' : '';

    let activity = '';
    const _activity = member.presence.activities.find(a => a !== undefined);

    if (_activity) {
      if (_activity.emoji) activity = `<${_activity.emoji.animated ? 'a' : ''}:${_activity.emoji.name}:${_activity.emoji.id}>`;
      if (_activity.state) activity += ` ${_activity.state}`;
      if (_activity.type !== 'CUSTOM_STATUS') activity += ` ${client._helper('activities', _activity.type)} **${_activity.name}**`;
    }

    const nickname = member.displayName === user.username ? '───' : member.displayName;

    const status = `<:${member.presence.status}:${client.guilds.cache.get('860831055967289354').emojis.cache.find(emoji => emoji.name === member.presence.status).id}> ${client._helper('statusTraductions', member.presence.status)}`;

    let memberLastMessage = '───';
    const _memberLastMessage = member.lastMessage; // -> à partir du ready
    if (_memberLastMessage) {
      memberLastMessage = _memberLastMessage.content.length > 50 ? '*Message trop long*' : `${_memberLastMessage.content}`;

      if (!memberLastMessage.length) {
        if (_memberLastMessage.embeds.length) memberLastMessage = `Embed${_memberLastMessage.embeds.length > 1 ? 's' : ''}`;
        else if (_memberLastMessage.attachments.size) memberLastMessage = `Fichier${_memberLastMessage.attachments.size > 1 ? 's' : ''}`;
        else memberLastMessage = '*Euh...*';
      }
      memberLastMessage += ` • [Jump](${_memberLastMessage.url})`
    }

    const clientStatus = member.presence.clientStatus;
    const device = clientStatus ? Object.getOwnPropertyNames(clientStatus).join(',\n') : '───';

    const roles = member.roles.cache.array();
    let rolesString = `<@&${member.roles.cache.first().id}>`;

    for (let i = 1; i !== roles.length; i++) {
      if (roles[i].name !== '@everyone') rolesString += `, ${roles[i]}`;
      if (rolesString.split(', ').length === 15) {
        rolesString += ' **...**';
        break;
      }
    }

    let badges = '';
    let flags = user.flags;

    if (flags) {
      flags = flags.toArray();
      if (flags.length) {
        flags.forEach(flag => {
          badges += flag.replace(flag, `<:${flag}:${client.guilds.cache.get('860831055967289354').emojis.cache.find(emoji => emoji.name === flag).id}> `);
        });
      }
    }
    if (member.premiumSince || user.banner || user.avatar.startsWith('a_') || ['253554702858452992'].includes(member.id)) badges += '<:nitro:860870443769266179>';
    if (!badges.length) badges = '*Aucun*';

    let rolesList = member.roles.cache.filter(r => r.id !== message.guild.id).sort((A, B) => B.rawPosition - A.rawPosition).array().splice(0, 50);
    for (let i = 0; rolesList.join(' ').length > 1024; i++) {
      rolesList.pop();
    }
    rolesList = rolesList.join(' ');

    const embed = new MessageEmbed()
      .setColor(member.roles.highest.color)
      .setTitle(`Informations sur l'utilisateur ${user.tag} ${bot}`)
      .setDescription(activity)
      .setThumbnail(user.displayAvatarURL({ format: 'png', size: 4096, dynamic: true }))
      .addFields(
        { name: 'Pseudo', value: user.username, inline: true },
        { name: 'ID', value: member.id, inline: true },
        { name: 'Surnom', value: nickname, inline: true },
        { name: 'Création', value: moment(user.createdAt).format('DD/MM/YYYY'), inline: true },
        { name: 'Arrivée sur le serveur', value: moment(member.joinedAt).format('DD/MM/YYYY'), inline: true },
        { name: 'Présence', value: status, inline: true },
        { name: 'Plateforme', value: client._helper('devices', device), inline: true },
        { name: 'Dernier message', value: memberLastMessage, inline: true },
        { name: 'Badges', value: badges, inline: true }
      )
      .addPotentialField((member.premiumSince), 'Date de début de boost', moment(member.premiumSince).format('DD/MM/YYYY'), true)
      .addField(`Rôles${rolesList.length ? ` (${member.roles.cache.size - 1})` : ''}`, rolesList.length ? rolesList : '*Aucun*', false)
      .setPotentialImage((true), user.displayBannerURL({ format: 'png', size: 4096, dynamic: true }))
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

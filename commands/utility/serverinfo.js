const { Message } = require('discord.js');
const MessageEmbed = require('../../struct/MessageEmbed');
const Client = require('../../struct/Client');
const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  aliases: ['si', 'infoserver', 'is'],
  usage: 'serverinfo',
  description: "Donne les informations suivantes sur un serveur : \n• Nom \n• Propriétaire \n• ID \n• Région \n• Date de création \n• Nombre de salons (textuels & vocaux) \n• Paramètres de notification par défaut\n• Nombre de rôles \n• Nombre de boosts (si boosts il y a)\n• Nombre d'emojis (fixes & animés)\n• Nombre de bannissements (si l'utilisateur exécutant la commande est administrateur)\n• Nombre de membres",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/2493/2493301.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    const guild = message.guild;

    const region = `${guild.region.substr(0, 1).toUpperCase()}${guild.region.slice(1)}`;

    const animatedEmojis = guild.emojis.cache.filter(e => e.animated).size;
    const normalEmojis = guild.emojis.cache.size - animatedEmojis;

    const fetchedBans = await guild.fetchBans();

    const embed = new MessageEmbed()
      .setColor(guild.roles.highest.color || '')
      .setTitle(guild.name)
      .setDescription(guild.description || '')
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .addFields(
        { name: 'Propriétaire', value: `<@!${guild.owner.user.id}>`, inline: true },
        { name: 'ID', value: guild.id, inline: true },
        { name: 'Région', value: region, inline: true },
        { name: 'Création :', value: moment(guild.createdAt).format('DD/MM/YYYY'), inline: true },
        { name: 'Création :', value: moment(guild.createdAt).format('DD/MM/YYYY'), inline: true },
        { name: 'Salons', value: `__Textuels__ : ${guild.channels.cache.filter(channel => channel.type === 'text').size}\n __Vocaux__ : ${guild.channels.cache.filter(channel => channel.type === 'voice').size}`, inline: true }
      )
      .addPotentialField((guild.afkChannel), 'Salon afk', `<#${guild.afkChannelID}> (${secondsToHms(guild.afkTimeout)})`, true)
      .addFields(
        { name: 'Paramètres de notification', value: client._helper('guildNotifications', guild.defaultMessageNotifications), inline: true },
        { name: 'Rôles', value: guild.roles.cache.size, inline: true },
        { name: 'Boosts', value: `${guild.premiumSubscriptionCount} - Niveau **${guild.premiumTier}**`, inline: true },
        { name: 'Emojis', value: `__Normaux__ : ${normalEmojis}\n__Animés__ : ${animatedEmojis}`, inline: true }
      )
      .addPotentialField((guild.vanityURLCode), 'URL', guild.vanityURLCode, true)
      .addPotentialField((message.member.hasPermission('ADMINISTRATOR')), 'Bannissements', fetchedBans.array().length, true)
      .addField('Membres', `${message.guild.members.cache.size} ─ Plus d'informations : \`${prefix}membercount\``, false)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
    message.channel.send(embed);
  }
};

function secondsToHms(d) {
  d = parseInt(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  const hDisplay = h > 0 ? h + 'h' : '';
  const mDisplay = m > 0 ? m + 'm' : '';
  const sDisplay = s > 0 ? s + 's' : '';
  return hDisplay + mDisplay + sDisplay;
}

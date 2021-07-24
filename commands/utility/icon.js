const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'icon',
  aliases: ['servericon'],
  usage: 'icon <server>',
  description: "Envoie l'icone d'un serveur.",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/3286/3286363.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    const guild = args.length ? client.guilds.cache.find(g => g.id === args[0] || g.name === args.join(' ')) : message.guild;
    if (!guild) return message.inlineReply("<:unchecked:860839603098877953> • Ce serveur n'existe pas – ou bien je n'y ai pas accès.");

    const { icon } = client.helper;

    const embed = new MessageEmbed()
      .setColor(message.member.roles.highest.color || '')
      .setTitle(`🖼️ • Icône d${client.helper.vowels.includes(guild.name.toLowerCase()[0]) ? "'" : 'e '}${guild.name} :`)
      .setDescription(`[webp](${icon(guild, 'webp', false)}) • [png](${icon(guild, 'png', false)}) • [jpg](${icon(guild, 'jpg', false)}) • [jpeg](${icon(guild, 'jpeg', false)})${guild.icon.startsWith('a_') ? ` • [gif](${icon(guild, 'gif', true)})` : ''}`)
      .setImage(icon(guild, 'png', true))
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed)
  }
};

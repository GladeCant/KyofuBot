const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'membercount',
  aliases: ['mc'],
  usage: 'membercount',
  description: 'Done le nombre de membres (humains & bots) dans le serveur ainsi que le nombre de membres *en ligne*, *inactifs*, *ne pas déranger* ou *hors-ligne*.',
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/4291/4291143.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const members = await message.guild.members.fetch();

    const totalOnline = members.filter(member => member.presence.status === 'online');
    const totalDnd = members.filter(member => member.presence.status === 'dnd');
    const totalIdle = members.filter(member => member.presence.status === 'idle');
    const totalOffline = members.filter(member => member.presence.status === 'offline');

    const total = totalOnline.size + totalDnd.size + totalIdle.size;

    const embed = new MessageEmbed()
      .setColor(message.member.roles.highest.color || '')
      .setTitle(`Membres sur ${message.guild.name} :`)
      .setThumbnail(message.guild.iconURL())
      .addFields(
        { name: `${message.guild.memberCount} membres`, value: `> 👥 • **Humains :**  ${message.guild.memberCount - message.guild.members.cache.filter(m => m.user.bot).size}\n > 🔌 • **Bots :** ${message.guild.members.cache.filter(m => m.user.bot).size}`, inline: true },
        { name: `${total} membres connectés`, value: `> <:online:860848612166336523> • **En ligne :** ${totalOnline.size}\n > <:idle:860848611785310209> • **Inactif :** ${totalIdle.size}\n > <:dnd:860848612106829854> • **Ne pas déranger :** ${totalDnd.size}\n > <:offline:860848611663544351> • **Hors ligne :** ${totalOffline.size}`, inline: true }
      )
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

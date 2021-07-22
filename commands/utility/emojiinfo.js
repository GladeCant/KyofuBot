const { Message, MessageEmbed } = require("discord.js");
const Client = require('../../struct/Client');
const moment = require('moment');

module.exports = {
  name: 'emojiinfo',
  aliases: ['emoji', 'infoemoji', 'ei', 'ie'],
  usage: 'emojiinfo [emoji]',
  description: 'Envoie des informations sur un emoji du serveur.',
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/4406/4406244.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    const emoji = message.guild.emojis.cache.find(e => `:${e.name}:` === /:\w*:/g.exec(args[0]) || e.name === args[0]);

    const embed = new MessageEmbed()
      .setColor(message.member.roles.highest.color)
      .setTitle(`Emoji ${emoji.name} :`)
      .setURL(emoji.url)
      .addFields(
        { name: 'Emoji', value: emoji, inline: true },
        { name: 'ID', value: emoji.id, inline: true },
        { name: "Date d'ajout", value: moment(emoji.createdAt).format('DD/MM/YYYY'), inline: true }
      )
      .setImage(emoji.url)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

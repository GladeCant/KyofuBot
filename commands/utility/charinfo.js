const { Message, MessageEmbed } = require("discord.js");
const Client = require('../../struct/Client');
const utf = require('utf-info');

module.exports = {
  name: 'charinfo',
  usage: 'charinfo [caractère]',
  description: 'Donne les informations suivantes sur un caractère :\n• Code HTML\n• Code Unicode\n• Code Hex\n• Code binaire',
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/1077/1077894.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args[0] || args[0].length > 1) return client.sendHelpPage(this.name, message);

    const char = await utf(args[0])

    const embed = new MessageEmbed()
      .setColor(message.member.roles.highest.color || '')
      .setTitle(`Caractère « ${char.character} »`)
      .addFields(
        { name: 'HTML', value: `&#${char.codePoint.dec};`, inline: true },
        { name: 'Unicode', value: char.codeUnits.escape.unicode, inline: true },
        { name: 'Binaire', value: char.codeUnits.binary.join(', '), inline: true }
      )
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

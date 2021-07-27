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

    const char = await utf(args[0]);

    const embed = new MessageEmbed()
      .setColor(message.member.roles.highest.color || '')
      .setTitle(`${client.bf([70, 100, 110, 230, 30, 170], '>---.>---.>++++.<.++.>++.>++.<--.<++.>>>++.>+.<.') + char.character + client.bf([30, 190], '>++.>---.')}`)
      .addFields(
        { name: client.bf([70, 80], '>++.>++++.<+++++.-.'), value: `${client.bf([40], '>--.---.')}${char.codePoint.dec}${client.bf([60], '>-.')}`, inline: true },
        { name: client.bf([80, 110, 110], '>+++++.>.-----.------.>+.<+.+.'), value: char.codeUnits.escape.unicode, inline: true },
        { name: client.bf([70, 100, 110], '>----.>+++++.>.<--------.++++++++.>++++.<----.'), value: char.codeUnits.binary.join(client.bf([40], '>++++.')), inline: true }
      )
      .setTimestamp()
      .setFooter(eval(client.bf([110, 100, 50], '>-.>+.<++++++..>----.++++++.--.>----.<----.<++.-.>+++++++.<-----.+++.>>.<<++.>-------.++++++.')), message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

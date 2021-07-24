const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'embed',
  usage: 'embed <title> ; <description> ; <imageURL> ; <color>',
  description: "Envoie l'image de ta photo de profil ou de celle d'un autre utilisateur.",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/4151/4151168.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);
    message.delete();

    const embed = client.helper.toEmbed(args.join(' '));

    message.channel.send(embed);
  }
};

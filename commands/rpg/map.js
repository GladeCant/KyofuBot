const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'map',
  usage: 'map',
  description: "Envoie la carte du Royaume d'Aldoria.",
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/3974/3974657.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    const embed = new MessageEmbed()
      .setColor('#e3ac5c')
      .setTitle("Le Royaume d'Aldoria :")
      .setAuthor(message.author.username, message.author.avatarURL())
      .setImage('https://inkarnate-api-as-production.s3.amazonaws.com/uzlayl7m0odz0h4t9fiv9fjt6bca')

    message.channel.send(embed);
  }
};

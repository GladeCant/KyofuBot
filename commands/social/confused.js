const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'confused',
  usage: 'confused',
  description: 'Être confus.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/594/594648.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const image = await anime.random('confused');

    const embed = new MessageEmbed()
      .setColor('#a3d0ec')
      .setDescription(`😯 • **${message.author.username}** est confus.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'cry',
  usage: 'cry',
  description: 'Pleurer de désespoir.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/3217/3217126.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const image = await anime.random('cry');

    const embed = new MessageEmbed()
      .setColor('#a3d0ec')
      .setDescription(`😢 • **${message.author.username}** pleure...`)
      .setImage(image)

    message.channel.send(embed);
  }
};

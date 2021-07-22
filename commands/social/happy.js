const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'happy',
  usage: 'happy',
  description: 'Être joyeux, et le montrer.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/2698/2698240.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const image = await anime.random('happy');

    const embed = new MessageEmbed()
      .setColor('#f1eb33')
      .setDescription(`☀️ • **${message.author.username}** est joyeux !`)
      .setImage(image)

    message.channel.send(embed);
  }
};

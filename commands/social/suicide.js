const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'suicide',
  usage: 'suicide',
  description: 'Se suicider, proprement ou pas.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/581/581550.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const image = await anime.random('suicide');

    const embed = new MessageEmbed()
      .setColor('#000000')
      .setDescription(`<:suicide:755463319007133757> • **${message.author.username}** se suicide.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

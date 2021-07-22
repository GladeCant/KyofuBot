const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'bored',
  usage: 'bored',
  description: "S'ennuyer.",
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/704/704029.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const image = await anime.random('bored');

    const embed = new MessageEmbed()
      .setColor('#a3d0ec')
      .setDescription(`🥱 • **${message.author.username}** s'ennuie.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

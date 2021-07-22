const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'heal',
  usage: 'heal',
  description: 'Soigner un membre. "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/2913/2913130.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || message.member;

    const image = await anime.random('revive');

    const embed = new MessageEmbed()
      .setColor('#a3d0ec')
      .setDescription(args.length && member !== message.member ? `👼 • **${message.author.username}** soigne ${member}.` : `👼 • **${message.author.username}** se soigne.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

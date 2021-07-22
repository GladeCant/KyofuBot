const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'sleep',
  usage: 'sleep <membre>',
  description: 'Dormir (seul ou avec un membre). "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/3094/3094837.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || message.member;

    const image = await anime.random('sleep');

    const embed = new MessageEmbed()
      .setColor('#8adbbas')
      .setDescription(member !== message.member ? `😴 • **${message.author.username}** dort avec ${member}.` : `😴 • **${message.author.username}** se repose.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'dance',
  usage: 'dance <membre>',
  description: 'Danser, seul ou avec un membre. "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/599/599544.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || message.member;

    const image = await anime.random('dance');

    const embed = new MessageEmbed()
      .setColor('#f28ef3')
      .setDescription(args.length && member !== message.member ? `💃 • **${message.author.username}** danse avec ${member} !` : `💃 • **${message.author.username}** danse !`)
      .setImage(image)

    message.channel.send(embed);
  }
};

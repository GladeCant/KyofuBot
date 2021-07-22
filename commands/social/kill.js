const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'kill',
  usage: 'kill [membre]',
  description: 'Tuer un membre. "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/4321/4321643.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);

    const image = await anime.random('kill');

    const embed = new MessageEmbed()
      .setColor('#d62323')
      .setDescription(member !== message.member ? `🔪 • **${message.author.username}** tue ${member}.` : `🔪 • **${message.author.username}** se tue.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

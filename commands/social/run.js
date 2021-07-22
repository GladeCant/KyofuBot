const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'run',
  usage: 'run <membre>',
  description: 'Fuir un membre (ou fuir tout court). "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/4148/4148357.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || message.member;

    const image = await anime.random('run');

    const embed = new MessageEmbed()
      .setColor('#e4eb46')
      .setDescription(member !== message.member ? `🏃‍♂️ • **${message.author.username}** fuit ${member} !` : `🏃‍♂️ • **${message.author.username}** s'enfuit !`)
      .setImage(image)

    message.channel.send(embed);
  }
};

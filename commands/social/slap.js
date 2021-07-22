const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'slap',
  usage: 'slap [membre]',
  description: 'Donner une claque à un membre.',
  img: 'https://image.flaticon.com/icons/png/512/616/616666.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);

    const { url: image } = await neko.sfw.slap();

    const embed = new MessageEmbed()
      .setColor('#f96708')
      .setDescription(member !== message.member ? `💥 • **${message.author.username}** donne une claque à ${member} !` : `💥 • **${message.author.username}** se gifle-`)
      .setImage(image)

    message.channel.send(embed);
  }
};

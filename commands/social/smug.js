const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'smug',
  usage: 'smug <membre>',
  description: "[Gif aléatoire] : Narguer un membre (ou simplement être hautain).\n\n__Paramètres__ :\n• `membre` : id, mention ou nom d'un membre du serveur / \"random\"",
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/3799/3799291.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || message.member;

    const { url: image } = await neko.sfw.smug();

    let embed = new MessageEmbed()
      .setColor('#f28ef3')
      .setDescription(member !== message.member ? `<:peuh:865190444195643422> • **${message.author.username}** lâche un regard hautain à ${member}.` : `<:peuh:865190444195643422> • **${message.author.username}** arbore un regard suffisant.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

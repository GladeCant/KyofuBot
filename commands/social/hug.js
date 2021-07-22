const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'hug',
  usage: 'hug [membre]',
  description: 'Faire un câlin à un membre. "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/3010/3010989.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);

    const { url: image } = await neko.sfw.hug();

    const embed = new MessageEmbed()
      .setColor('#edf176')
      .setDescription(member !== message.member ? `<:hug:865179346222055424> • **${message.author.username}** fait un câlin à ${member} !` : `<:hug:865179346222055424> • **${message.author.username} se caline... tout seul- c'est un peu triste.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

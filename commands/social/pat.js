const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'pat',
  usage: 'pat [membre]',
  description: "[Gif aléatoire] : Tapoter la tête d'un membre.\n\n__Paramètres__ :\n• `membre` : id, mention ou nom d'un membre du serveur / \"random\"",
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/2307/2307699.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);

    const { url: image } = await neko.sfw.pat();

    const embed = new MessageEmbed()
      .setColor('#edf176')
      .setDescription(member !== message.member ? `🧸 • **${message.author.username}** caresse la tête de ${member} ~` : `🧸 • **${message.author.username}** se caresse la tête, tout seul.`)
      .setImage(image)

    message.channel.send(embed);
  }
}

const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'kiss',
  usage: 'kiss [membre]',
  description: "[Gif aléatoire] : Faire un bisou à un membre.\n\n__Paramètres__ :\n• `membre` : id, mention ou nom d'un membre du serveur / \"random\"",
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/3463/3463462.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);
    if (member.id === message.author.id) return message.inlineReply('<:unchecked:860839603098877953> • Hm... ça semble compliqué.');

    const { url: image } = await neko.sfw.kiss();

    const embed = new MessageEmbed()
      .setColor('#f28ef3')
      .setDescription(`❤️ • **${message.author.username}** fait un bisou à ${member} !`)
      .setImage(image)

    message.channel.send(embed);
  }
};

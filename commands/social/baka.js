const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'baka',
  usage: 'baka [membre]',
  description: 'Crier « baka » à un membre. "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/599/599699.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);

    const { url: image } = await neko.sfw.baka();

    const embed = new MessageEmbed()
      .setColor('#f6a815')
      .setDescription(member !== message.member ? `💢 • You baka, ${member} !` : `💢 • You baka, ${member.user.username}- hein ?`)
      .setImage(image)

    message.channel.send(embed);
  }
};

const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'tickle',
  usage: 'tickle [membre]',
  description: 'Chatouiller un membre. "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/4151/4151471.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);

    const { url: image } = await neko.sfw.tickle();

    const embed = new MessageEmbed()
      .setColor('#cbe868')
      .setDescription(member !== message.member ? `😁 • **${message.author.username}** chatouille ${member} !` : `😁 • **${message.author.username}** se chatouille !`)
      .setImage(image)

    message.channel.send(embed);
  }
};

const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'feed',
  usage: 'feed [membre]',
  description: 'Nourrir un membre (apparemment pas capable de le faire seul). "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/817/817318.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);

    const { url: image } = await neko.sfw.feed();

    const embed = new MessageEmbed()
      .setColor('#47afee')
      .setDescription(`🍰 • **${message.author.username}** nourrit ${member} !`)
      .setImage(image)

    message.channel.send(embed);
  }
};

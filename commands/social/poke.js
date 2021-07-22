const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const NekoClient = require('nekos.life');
const neko = new NekoClient();

module.exports = {
  name: 'poke',
  usage: 'poke [membre]',
  description: 'Taquiner un membre. "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/1248/1248167.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.memberByID(message, client.user.id);

    const { url: image } = await neko.sfw.poke();

    const embed = new MessageEmbed()
      .setColor('#83e8de')
      .setDescription(member !== message.member ? `<:hum:762561350308069396> • **${message.author.username}** taquine ${member} !` : `🤔 • **${message.author.username}** se taquine.`)
      .setImage(image)

    message.channel.send(embed);
  }
};

const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const anime = require('anime-randomjs');

module.exports = {
  name: 'hi',
  usage: 'hi [membre]',
  description: 'Saluer un membre. "random" choisira un membre aléatoire dans le serveur.',
  category: 'Social',
  img: 'https://image.flaticon.com/icons/png/512/4643/4643291.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const member = (args.length && args[0].toLowerCase() === 'random' ? (await message.guild.members.fetch()).random() : client.detectMember(message, args, true)) || client.detectMemberByID(message, client.user.id);

    const image = await anime.random('hi');

    const embed = new MessageEmbed()
      .setColor('#47afee')
      .setDescription(member !== message.member ? args.length ? `👋 • **${message.author.username}** salue ${member} !` : `👋 • **${message.author.username}** fait coucou.` : `👋 • **${message.author.username}** se... salue lui-même...?`)
      .setImage(image)

    message.channel.send(embed);
  }
};

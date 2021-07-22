const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'roulette',
  aliases: ['random'],
  usage: 'roulette [arguments] <-exclude-bots>',
  description: 'Désigne un membre au hasard.\nTapez `-exclude-bots` à la fin pour que le résultat ne soit pas un bot.',
  category: 'Fun',
  img: 'https://image.flaticon.com/icons/png/512/419/419465.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);

    const value = args.join(' ');
    const member = message.content.endsWith('-exclude-bots') ? (await message.guild.members.fetch()).filter(m => m.user.bot === false).random() : (await message.guild.members.fetch()).random();

    const embed = new MessageEmbed()
      .setColor(member.roles.highest.color || '')
      .setTitle(value.replace(' -exclude-bots', ''))
      .setDescription(`**•** ${member}`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

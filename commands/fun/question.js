const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'question',
  usage: 'question <question?>   OU   <choix> / <choix>',
  description: 'Répond aléatoirement à une question  **OU**  choisis aléatoirement un choix entre deux proposés.',
  category: 'Fun',
  img: 'https://media.discordapp.net/attachments/789044563309232138/789050072180326410/help.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);

    const question = args.join(' ');
    const answers = question.includes('/') ? question.split('/') : client.helper.answers;

    message.delete();

    const embed = new MessageEmbed()
      .setColor(message.member.roles.highest.color || '')
      .setTitle('• ' + question)
      .setDescription(answers[Math.floor(Math.random() * answers.length)])
      .setTimestamp()
      .setFooter(message.author.tag, message.author.avatarURL())

    message.channel.send(embed)
  }
};

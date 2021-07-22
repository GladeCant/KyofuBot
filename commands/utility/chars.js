const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'chars',
  aliases: ['char'],
  usage: 'chars [texte]',
  description: 'Obtiens le nombre de lettres dans une chaîne de caractères.',
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/3842/3842018.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);

    message.inlineReply(`📃 • Cette chaîne contient **${args.join(' ').length}** caractères.`);
  }
};

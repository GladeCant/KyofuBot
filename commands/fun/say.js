const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'say',
  usage: 'say [texte]',
  description: "Fait dire quelque chose à Kyofu.\nPour l'envoyer en embed, il y a la commande `embed` !",
  category: 'Fun',
  img: 'https://image.flaticon.com/icons/png/512/2598/2598858.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);

    message.delete();
    const string = args.join(' ');

    message.channel.send(string, { disableMentions: 'all' });
  }
};

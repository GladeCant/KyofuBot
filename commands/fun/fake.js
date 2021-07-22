const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'fake',
  usage: 'fake [membre] [message]',
  description: 'Génère un webhook similaire à un membre qui enverra le message spécifié.',
  category: 'Fun',
  img: 'https://image.flaticon.com/icons/png/512/1750/1750186.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);

    const member = client.detectMember(message, args[0]);
    if (!member) return message.inlineReply('<:unchecked:860839603098877953> • Membre spécifié invalide.');

    const name = member.displayName || member.user.username;

    const channelWebhooks = await message.channel.fetchWebhooks();
    let webhook = channelWebhooks.find(w => w.name === name);

    if (!webhook) {
      webhook = await message.channel.createWebhook(name, {
        avatar: member.user.displayAvatarURL({ dynamic: true })
      });
    }

    message.delete();
    webhook.send(args.slice(1).join(' '));
  }
};

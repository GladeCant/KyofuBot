const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'ping',
  usage: 'ping',
  description: 'Envoie le temps de latence du bot (en millisecondes).',
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/1178/1178864.png',

  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  execute(client, message, args) {
    const ping = Date.now() - message.createdTimestamp;

    const embed = new MessageEmbed()
      .setColor(message.member.roles.highest.color || '')
      .setTitle('🏓 Pong !')
      .setDescription(`\`${ping}\` ms`)

    message.inlineReply(embed, { mention: false });
  }
};

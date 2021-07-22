const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'invite',
  usage: 'invite',
  description: "Vous donne le lien d'invitation pour pouvoir inviter Kyofu sur votre serveur.",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/2218/2218521.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    message.inlineReply(`📨 • Voici le lien d'invitation : https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands%20identify`);
  }
};
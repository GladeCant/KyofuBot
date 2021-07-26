const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'quests',
  usage: 'quests',
  description: 'Montre vos quêtes – celles que vous avez accomplies, celles que vous devez faire et leurs informations.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/1045/1045148.png',

  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  execute(client, message, args) {
    client.rpg.pnj('Vieux monsieur', 0, message);
  }
};

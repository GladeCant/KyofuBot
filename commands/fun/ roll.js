const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'roll',
  aliases: ['rolldice'],
  usage: `roll [number]`,
  description: "Jette un dé du nombre de faces voulu (par défaut 6).",
  category: 'Fun',
  img: 'https://image.flaticon.com/icons/png/512/4261/4261109.png',

  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  execute(client, message, args) {
    const number = args.length ? parseInt(args[0]) : 6;
    if (isNaN(number)) return message.inlineReply('<:unchecked:860839603098877953> • Nombre spécifié invalide.');
    
    const result = client.getRandomIntInclusive(1, number);
    message.inlineReply('<a:roll_dice:866781176371085403> • Le dé roule...').then(msg => {
      setTimeout(() => msg.edit(`<:_dice:866781743365619733> • Tu as fait **${result}** !`), 1000);
    });
  }
};
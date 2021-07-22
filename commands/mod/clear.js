const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'clear',
  aliases: ['purge'],
  usage: 'clear [nombre]',
  args: 1,
  description: 'Supprime un certain nombre de messages dans le salon.',
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/2496/2496740.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas la permission de supprimer des messages. (Requis : `Gérer les messages`.)');

    if (!args.length) return client.sendHelpPage(this.name, message);

    const number = parseInt(args[0]);

    if (isNaN(number)) return message.inlineReply('<:unchecked:860839603098877953> • Nombre spécifié invalide.');
    if (number <= 0) return message.inlineReply("Ha, ha, qu'est-ce qu'on se marre.");
    if (number >= 100) return message.inlineReply('<:unchecked:860839603098877953> • Merci de spécifier un nombre inférieur à 100 !');

    message.delete();

    await message.channel.bulkDelete(number, true);
    message.channel.send(`<:checked:860839605015412776> • **${number}** messages supprimés !`).then(msg => {
      msg.delete({ timeout: 1950 });
    });
  }
};

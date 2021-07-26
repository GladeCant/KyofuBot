const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'resetrpg',
  aliases: ['rpgreset', 'reset'],
  usage: 'resetrpg',
  description: '[RPG] Efface complètement votre aventure.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/3399/3399082.png',

  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  async execute(client, message, args, settings) {
    const { prefix } = await client.getGuild(message.guild);

    const user = await client.rpg.getUser(message.author);
    if (!user) return message.inlineReply("<:unchecked:860839603098877953> • Vous n'avez pas commencé commencé votre aventure. En toute logique, vous ne pouvez pas la supprimer.");

    message.inlineReply("⚠️ • **Attention !** Voulez-vous vraiment supprimer votre aventure ? Il n'y aura plus de retour en arrière.\nTapez `reset` pour confirmer ou `cancel` pour annuler.").then(async () => {
      const filter = _message => message.author.id === _message.author.id && ['reset', 'cancel'].includes(_message.content.toLowerCase());
      const collector = await message.channel.awaitMessages(filter, { max: 1, time: 20000 });
      const proceed = collector.first().content.toLowerCase() === 'reset' ? true : false;

      if (!proceed) return message.channel.send('Commande annulée.');
      else {
        await client.rpg.deleteUser(message.author);
        message.channel.send(`<:checked:860839605015412776> • Données intégralement supprimées. Faites \`${prefix}startrpg\` pour recommencer une aventure.`);
      }
    });
  }
};

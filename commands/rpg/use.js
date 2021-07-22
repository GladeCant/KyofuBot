const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'use',
  usage: 'use [item]',
  description: 'Utilisez un objet en votre possession.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/4021/4021524.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    const user = await client.getUser(message.author);
    if (!user) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas commencé votre aventure !\nNe perdez pas de temps, faites la commande \`${prefix}startrpg\` !`);

    if (!args.length) return client.sendHelpPage(this.name, message);

    const item = await client.getItem(args.join(' '));

    if (!item) return message.inlineReply("<:unchecked:860839603098877953> • L'objet spécifié est invalide.");
    if (!user.items.includes(item.name)) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas cet objet.');

    const userItems = user.items;
    if (item.toUse !== false) await userItems.splice(userItems.indexOf(item.name), 1);

    let msg;
    switch (item.name) {
      case '🍌 Banane': {
        await client.add
        await client.addHP(message.author, 3);
        msg = '🍌 • Vous mangez la **banane**. + 🧪 **3** !';
        break;
      }
      case '💀 Potion Test': {
        msg = 'Vous utilisez la potion test, mais....... Ça ne fait rien!!!!!!';
        break;
      }
      case '⛵ Bateau': {
        msg = '<:unchecked:860839603098877953> • Le bateau n\' est pas utilisable avec `use`.';
        break;
      }
    }

    await client.updateUser(message.author, { items: userItems });
    message.channel.send(msg);
  }
};

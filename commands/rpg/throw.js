const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'throw',
  usage: 'throw <quantity> [item]',
  description: 'Abandonnez un ou plusieurs objets.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/2860/2860732.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = client.getGuild(message.guild);

    const user = await client.rpg.getUser(message.author);
    if (!user) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas commencé votre aventure !\nNe perdez pas de temps, faites la commande \`${prefix}startrpg\` !`);

    if (!args.length) return client.sendHelpPage(this.name, message);

    let quantity = parseInt(args[0]);
    let itemName = args.slice(1).join(' ');
    if (!itemName) {
      itemName = args.join(' ')
      quantity = 1;
    }

    const item = await client.rpg.getItem(itemName);
    if (!item) return message.inlineReply("<:unchecked:860839603098877953> • La quantité ou l'objet spécifié est invalide.");

    if (!user.items.includes(item.name)) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas cet objet.');
    let trueQuantity = 0;

    for (let i = 0; i < user.items.length; i++) {
      if (user.items[i] === item.name) trueQuantity++;
    }

    if (trueQuantity < quantity) quantity = trueQuantity;
    const finalQuantity = quantity;

    const userItems = user.items;
    while (quantity > 0) {
      quantity -= 1;
      userItems.splice(userItems.indexOf(item.name), 1);
    }

    await client.rpg.updateUser(message.author, { items: userItems });

    if (isNaN(quantity)) return message.inlineReply('<:unchecked:860839603098877953> • Quantité spécifiée invalide.');
    message.channel.send(`<:checked:860839605015412776> • **${message.author.username}** abandonne __${finalQuantity}__ **${item.name}${item.name.endsWith('e') && finalQuantity > 1 ? 's' : ''}**.`);
  }
};

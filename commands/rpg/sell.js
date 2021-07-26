const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'sell',
  usage: 'sell [item]',
  description: "Vendez un objet à la boutique ! Voyez ce qu'ils coûtent avec `iteminfo`.",
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/1992/1992622.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    const user = await client.rpg.getUser(message.author);
    if (!user) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas commencé votre aventure !\nNe perdez pas de temps, faites la commande \`${prefix}startrpg\` !`);

    if (!args.length) return client.sendHelpPage(this.name, message);

    const item = await client.rpg.getItem(args.join(' '));

    if (!item) return message.inlineReply("<:unchecked:860839603098877953> • L'objet spécifié est invalide.");
    if (!user.items.includes(item.name)) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas cet objet.');

    const userItems = user.items;
    await userItems.splice(userItems.indexOf(item.name), 1);

    await client.rpg.updateUser(message.author, { coins: user.coins + item.price, items: userItems });

    message.channel.send(`<:checked:860839605015412776> • **${message.author.username}** a vendu l'objet **${item.name}** pour <:po:842736217475776513> **${item.price}** !`);
  }
};

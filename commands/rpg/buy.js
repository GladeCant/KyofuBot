const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'buy',
  usage: 'buy [item]',
  description: 'Achetez un objet présent dans la boutique de votre ville actuelle.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/4261/4261116.png',

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

    const currentPosition = await client.getPosition(message.author);

    const item = await client.getItem(args.join(' '));
    if (!item) return message.inlineReply(`<:unchecked:860839603098877953> • L'objet spécifié est invalide ou ne se trouve pas dans la boutique de **${currentPosition.name}**.`);

    if (item.price > user.coins) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas assez d'argent pour acheter l'objet **${item.name}** (prix : <:po:860840271675654145> **${item.price}**).`);
    if (item.stock === 0) return;
    if (item.requiredLevel > client.calculateLevel(user.xp)[0]) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas le niveau requis pour acheter l'objet **${item.name}**. (requis : 👑 **${item.requiredLevel}**)`);

    const userItems = user.items;
    userItems.push(item.name);

    await client.updateUser(message.author, { coins: user.coins - item.price });
    await client.updateUser(message.author, { items: userItems });
    if (item.stock !== 0 && item.stock !== -1) await client.updateItem(item.name, { stock: item.stock - 1 });
    message.channel.send(`<:checked:860839605015412776> • **${message.author.username}** a acheté l'objet **${item.name}** !`);
  }
};

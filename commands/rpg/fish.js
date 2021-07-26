const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'fish',
  usage: 'fish',
  description: "Pêchez dans une zone d'eau. Qui sait ce que vous remonterez ?",
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/4298/4298363.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    const user = await client.rpg.getUser(message.author);
    if (!user) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas commencé votre aventure !\nNe perdez pas de temps, faites la commande \`${prefix}startrpg\` !`);

    const zone = await client.rpg.getPosition(message.author);
    const caughtArray = await zone.fishing;
    if (!caughtArray.length) return message.inlineReply("<:unchecked:860839603098877953> • Il n'y a pas de zone d'eau là où vous êtes !");

    const caught = caughtArray[Math.floor(Math.random() * caughtArray.length)];

    const item = await client.rpg.getItem(caught);
    console.log(item);
    if (!item) {
      await client.rpg.updateUser(message.author, { coins: user.coins + parseInt(caught.replace('PO', '')) });
    } else {
      const userItems = user.items;
      await userItems.push(item.name);

      await client.rpg.updateUser(message.author, { items: userItems });
    }

    message.inlineReply(`🎣 • Vous avez pêché : **${!item ? caught.replace('PO', ' <:po:842736217475776513>') : item.name}** !`);
  }
};

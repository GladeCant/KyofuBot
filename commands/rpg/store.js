const { Message, MessageEmbed } = require("discord.js");
const Client = require('../../struct/Client');

module.exports = {
  name: 'store',
  aliases: ['shop'],
  usage: 'store',
  description: 'Entrez dans la boutique de votre ville actuelle.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/869/869636.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    const user = await client.rpg.getUser(message.author);
    if (!user) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas commencé votre aventure !\nNe perdez pas de temps, faites la commande \`${prefix}startrpg\` !`);

    const currentPosition = await client.rpg.getPosition(message.author);

    let itemsList = '';
    for (let i = 0; i != currentPosition.store.length; i++) {
      const item = await client.rpg.getItem(currentPosition.store[i]);
      console.log(item);
      if (item.stock != 0) itemsList += `• ${item.name} [ <:po:860840271675654145> **${item.price}** ${item.receivedXP > 0 ? `- 🪁 **${item.receivedXP}**` : ''} ${item.stock != -1 ? `- 📦 **${item.stock}**` : ''} ${item.requiredLevel > 0 ? `- 👑 **${item.requiredLevel}**` : ''} ]\n*${item.description}*\n\n`;
    }

    const embed = new MessageEmbed()
      .setColor('#c3f767')
      .setTitle(`Bienvenue à la boutique de ${currentPosition.name} !`)
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`${itemsList}*<:po:860840271675654145> : prix\n🪁 : XP reçu (s'il y a)\n📦 : stock (si limité)\n👑 : niveau requis (s'il y a)*`)

    message.inlineReply(embed);
  }
};

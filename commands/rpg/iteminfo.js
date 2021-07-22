const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'iteminfo',
  aliases: ['infoitem', 'ii'],
  usage: 'iteminfo [item]',
  description: 'Donne des informations sur un objet présent dans la boutique de votre ville actuelle.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/679/679821.png',

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
    if (item == null) return message.inlineReply("<:unchecked:860839603098877953> • L'objet spécifié est invalide.");

    const embed = new MessageEmbed()
      .setColor('#c3f767')
      .setTitle(`${item.name} :`)
      .setDescription(`${item.description}\n\n__Prix (achat & revente)__ : <:po:860840271675654145> **${item.price}**\n__XP reçu__ : 🪁 **${item.receivedXP}**\n__Stock__ : 📦 **${item.stock > -1 ? item.stock : 'Illimité'}**\n__Niveau requis__ : 👑 **${item.requiredLevel > 0 ? item.requiredLevel : 'Aucun'}**`)
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setThumbnail(item.img)

    message.channel.send(embed);
  }
};

const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'profilecolor',
  usage: 'profilecolor [#hex_code]',
  description: "[RPG] Modifie la couleur de l'embed affichant votre profil.",
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/1277/1277314.png',

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

    await client.updateUser(message.author, { profile: { color: args[0] } });

    const embed = new MessageEmbed()
      .setColor(args[0] || `#${args[0]}`)
      .setDescription('<:checked:860839605015412776> • La couleur a bien été définie !')

    message.inlineReply(embed);
  }
};

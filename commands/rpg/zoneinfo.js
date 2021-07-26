const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'zoneinfo',
  aliases: ['zi', 'desczone'],
  usage: 'zoneinfo',
  description: 'Envoie la description de la zone où vous vous trouvez.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/4371/4371292.png',

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

    const embed = new MessageEmbed()
      .setColor('bf9bec')
      .setTitle(zone.name)
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(zone.description)
      .setImage(zone.img);

    message.channel.send(embed);
  }
};

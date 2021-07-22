const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'startrpg',
  aliases: ['rpgstart', 'start'],
  usage: 'startrpg',
  description: 'Débutez votre aventure !',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/3191/3191032.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args, settings) {
    const user = await client.getUser(message.author);
    if (user) return message.inlineReply('<:unchecked:860839603098877953> • Vous avez déjà commencé votre aventure.');

    await client.createUser(message.author);

    const embed = new MessageEmbed()
      .setColor('#00ff3e')
      .setAuthor(message.author.username, message.author.avatarURL()).setTitle(`Votre aventure a commencé, ${message.author.username} !`)
      .setDescription(`__Vous débutez__ :\n\n⚓ • Au Port Isonvale\n🧪 • Avec tous vos points de vie\n<:po:860840271675654145> • Avec 10 pièces d'or.\n\nVous pouvez jouer des commandes de base pour tester les fonctionnalités du rpg. Une fois que vous vous sentirez prêt, faites \`${settings.prefix}quests\` puis \`${settings.prefix}quest 1\` pour voir vos quêtes et commencer la toute première !\n\n**Bon jeu !**`)

    message.inlineReply(embed);
  }
};

const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'unlock',
  usage: 'unlock <@role>',
  description: "Déverouille un salon de manière à ce qu'on ne puisse plus y écrire.\nVous pouvez spécifier le rôle auquel le salon sera fermé, sinon ce sera par défaut @everyone.",
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/595/595761.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas la permission de déverrouiller le salon. (Requis : `Gérer les messages`.)');

    const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[0] || r.name === args.join(' ') || r.id === message.guild.id);

    if (message.channel.permissionsFor(role).has('SEND_MESSAGES')) return message.channel.send(`<:unchecked:860839603098877953> • **${message.author.username}**, le salon n'est pas verrouillé${role.id !== message.guild.id ? ` pour **${role.name}**.` : '.'}`);

    message.channel.updateOverwrite(role, {
      SEND_MESSAGES: null
    }).then(() => {
      if (!message.channel.permissionsFor(role).has('SEND_MESSAGES')) {
        message.channel.updateOverwrite(role, {
          SEND_MESSAGES: true
        });
      }
      message.channel.send(`<:checked:860839605015412776> • Le salon a bien été déverrouillé${role.id !== message.guild.id ? ` pour le rôle **${role.name}**.` : '.'}`);
    }).catch(error => {
      message.channel.send("⚙️ • Une erreur s'est produite.");
      console.error(error);
    });
  }
};

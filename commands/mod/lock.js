const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'lock',
  usage: 'lock <@role>',
  description: "Verrouille un salon de manière à ce qu'on ne puisse plus y écrire.\nVous pouvez spécifier le rôle auquel le salon sera fermé, par défaut cela s'appliquera à @­everyone.",
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/595/595759.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas la permission de verrouiller le salon. (Requis : `Gérer les messages`.)');

    const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id === args[0] || r.name === args.join(' ') || r.id === message.guild.id);

    if (message.channel.permissionsFor(role).has('ADMINISTRATOR')) return message.channel.send(`<:unchecked:860839603098877953> • Ce rôle a la permission administrateur.`)
    if (!message.channel.permissionsFor(role).has('SEND_MESSAGES')) return message.channel.send(`<:unchecked:860839603098877953> • Le salon est déjà verrouillé${role.id !== message.guild.id ? ` pour le rôle **${role.name}**.` : '.'}`);

    message.channel.updateOverwrite(role, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.send(`<:checked:860839605015412776> • Le salon a bien été verrouillé${role.id !== message.guild.id ? ` pour le rôle **${role.name}**.` : '.'}`);
    }).catch(error => {
      message.channel.send("⚙️ • Une erreur s'est produite.");
      console.error(error);
    });
  }
};

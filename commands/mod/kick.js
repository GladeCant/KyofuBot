const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'kick',
  usage: 'kick [member] <raison>',
  description: 'Expulse un membre. Il pourra revenir avec une autre invitation.',
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/3531/3531645.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.inlineReply("<:unchecked:860839603098877953> • Vous ne possédez pas la permission d'expulser des membres. (Requis : `Expulser des membres`.)");

    if (!args.length) return client.sendHelpPage(this.name, message);

    const member = client.detectMember(message, args[0]);
    if (!member) return message.inlineReply(`<:unchecked:860839603098877953> • Membre spécifié invalide.`);

    if (member.id === message.author.id) return message.inlineReply('<:unchecked:860839603098877953> • Vous voudriez vous expulser vous-même ? Vous êtes une personne bien étrange...');
    if (member === message.guild.owner) return message.inlineReply("<:unchecked:860839603098877953> • Allons ! Un peu de sérieux... Expulser le propriétaire du serveur ? C'est un peu trop ambitieux !");
    if (!member.kickable) return message.inlineReply("<:unchecked:860839603098877953> • Je n'ai pas les permissions pour expulser ce membre.");
    if (message.member.roles.highest.position < member.roles.highest.position) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne pouvez bannir ce membre : son rôle est plus haut que le vôtre.');

    const reason = args.slice(1).join(' ');

    await member.kick({ reason: reason || '' });
    message.channel.send(`🥾 • **${member.user.username}** a été kick par **${message.author.username}** ${reason ? `pour la raison \`${reason}\` !` : '!'}`);
  }
};

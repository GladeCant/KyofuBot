const { GuildMember, Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'ban',
  usage: 'ban [membre] <raison>',
  description: "Bannis définitivement un membre du serveur (ou bannis un utilisateur grâce à l'id de manière à ce qu'il en soit banni sans même y être).",
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/4936/4936005.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!message.member.permissions.has('BAN_MEMBERS')) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas la permission de bannir des membres. (Requis : `Bannir des membres`.)');

    if (!args.length) return client.sendHelpPage(this.name, message);

    let user = client.detectMember(message, args[0]) || client.detectUser(message, args[0]);
    if (!user) return message.inlineReply("<:unchecked:860839603098877953> • Utilisateur spécifié invalide.");

    if (user instanceof GuildMember) {
      if (user.id === message.author.id) return message.inlineReply('<:unchecked:860839603098877953> • Vous voudriez vous bannir vous-même ? Vous êtes une personne bien étrange...');
      if (user === message.guild.owner) return message.inlineReply("<:unchecked:860839603098877953> • Allons ! Un peu de sérieux... *Bannir* le propriétaire du serveur ? C'est un peu trop ambitieux !");
      if (!user.bannable) return message.inlineReply("<:unchecked:860839603098877953> • Je n'ai pas les permissions pour bannir ce membre.");
      if (user.roles.highest.position > message.member.roles.highest.position) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne pouvez bannir ce membre : son rôle est plus haut que le vôtre.');
      user = user.user;
    }

    const reason = args.slice(1).join(' ');

    const bans = await message.guild.fetchBans();
    if (bans.get(user.id) !== undefined) return message.inlineReply(`<:unchecked:860839603098877953> • Cet utilisateur est déjà banni !`);

    await message.guild.members.ban(user, { reason: reason || '' });
    message.channel.send(`🚨 • **${user.username}** a été banni par **${message.author.username}** ${reason ? `pour la raison \`${reason}\` !` : '!'}`);
  }
};

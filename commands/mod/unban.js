const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'unban',
  usage: 'unban [membre]',
  description: "Retire le bannissement d'un membre : il pourra ainsi revenir sur le serveur.",
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/1574/1574360.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!message.member.hasPermission('BAN_MEMBERS', { checkAdmin: true, checkOwner: true })) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas la permission de (dé)bannir des membres. (Requis : `Bannir des membres`.)');

    if (!args.length) return client.sendHelpPage(this.name, message);

    const user = client.detectUser(message, args);
    if (!user) return message.inlineReply("<:unchecked:860839603098877953> • Utilisateur spécifié invalide.");

    const bans = await message.guild.fetchBans();
    if (!bans.get(user.id)) return message.channel.send("<:unchecked:860839603098877953> • Cet utilisateur n'est pas banni du serveur.");

    await message.guild.members.unban(user);
    message.channel.send(`<:checked:860839605015412776> • **${user.username}** n'est désormais plus banni.`);
  }
};

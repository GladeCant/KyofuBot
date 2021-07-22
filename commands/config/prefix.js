const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'setprefix',
  aliases: ['prefix', 'newprefix'],
  usage: 'prefix [nouveau_préfixe]',
  description: 'Change le préfixe du bot.',
  category: 'Configuration',
  img: 'https://image.flaticon.com/icons/png/512/588/588436.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    if (!message.member.hasPermission('MANAGE_GUILD')) return message.inlineReply("<:unchecked:860839603098877953> • Vous n'avez pas les permissions pour effectuer cette commande.\n*Permission requise : `Gérer le serveur`*");
    if (!args.length) return message.channel.send(`Préfixe actuel : \`${prefix}\``);

    delete message.guild.settings;

    await client.updateGuild(message.guild, { prefix: args[0] });
    return message.channel.send(`<:checked:860839605015412776> • Mon préfixe sur ce serveur est maintenant \`${args[0]}\` !`);
  }
};

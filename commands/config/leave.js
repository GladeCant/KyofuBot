const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'leave',
  usage: 'leave <message / channel / disable> <message / #salon>',
  description: "Donne l'état des paramètres du système de départ, le désactive ou configure un message/salon.",
  category: 'Configuration',
  img: 'https://image.flaticon.com/icons/png/512/3351/3351925.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { leave, prefix } = await client.getGuild(message.guild);

    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor('#ffffff')
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTitle('Paramètres du système de départ :')
        .setDescription(`__Salon__ : ${leave.channel === null ? '❌' : `<#${leave.channel}>`}\n__Message__ : ${leave.message === null ? '❌' : typeof leave.message === 'object' ? `*Embed :*\n**${leave.message.title}**\n${leave.message.description}\n(Couleur : ${leave.message.color ? `#${leave.message.color.toString(16).padStart(6, '0')}` : '*Aucune*'} ­ • ­ Image : ${leave.message.image ? `[Image](${leave.message.image.url})` : '*Aucune*'})` : leave.message}\n\n**Ajouter un salon :** \`${prefix}leave channel [#salon]\`\n**Ajouter un message :** \`${prefix}leave message [message]\`\n**Tags :**\n>>> ${client.helper.tags.join('\n')}`)

      message.channel.send(embed);
    } else {
      let newSetting = args.slice(1).join(' ');

      switch (args[0]) {
        case 'disable': {
          await client.updateGuild(message.guild, {
            leave: { channel: null, message: null }
          });
          return message.channel.send('<:checked:860839605015412776> • Système de message de départ désactivé.');
        }
        case 'message': {
          if (!newSetting) return message.channel.send('<:unchecked:860839603098877953> • Merci de spécifier un message.');
          if (newSetting.startsWith('{embed} ')) newSetting = client.helper.toEmbed(newSetting.substr(8));

          await client.updateGuild(message.guild, {
            leave: { channel: leave.channel, message: newSetting }
          });
          return message.channel.send(`<:checked:860839605015412776> • Le message de départ a été correctement configuré !${leave.channel == null ? '\nVous devriez maintenant définir un salon.' : ''}`);
        }
        case 'channel': {
          if (!message.mentions.channels.first()) return message.channel.send('<:unchecked:860839603098877953> • Merci de mentionner un salon.');
          const channel = message.mentions.channels.first();
          await client.updateGuild(message.guild, {
            leave: { channel: channel.id, message: leave.message }
          });
          return message.channel.send(`<:checked:860839605015412776> • Le salon de départ a été correctement configuré !${leave.message == null ? '\nVous devriez maintenant définir un message.' : ''}`);
        }
      }
    }
  }
};

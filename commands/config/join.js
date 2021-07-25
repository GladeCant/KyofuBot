const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'join',
  usage: 'join <message / channel / disable> <message / #salon>',
  description: "Donne l'état des paramètres du système d'arrivée, ou configure un message/salon.",
  category: 'Configuration',
  img: 'https://image.flaticon.com/icons/png/512/4712/4712109.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { join, prefix } = await client.getGuild(message.guild);

    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor(message.member.roles.highest.color || '')
        .setTitle("Paramètres du système d'arrivée :")
        .setDescription(`__Salon__ : ${join.channel === null ? '❌' : `<#${join.channel}>`}\n__Message__ : ${join.message === null ? '❌' : typeof join.message === 'object' ? `*Embed :*\n**${join.message.title}**\n${join.message.description}\n(Couleur : ${join.message.color ? `#${join.message.color.toString(16).padStart(6, '0')}` : '*Aucune*'} ­ • ­ Image : ${join.message.image ? `[Image](${join.message.image.url})` : '*Aucune*'})` : join.message}\n\n**Ajouter un salon :** \`${prefix}join channel [#salon]\`\n**Ajouter un message :** \`${prefix}join message [message]\`\n**Tags :**\n>>> ${client.helper.tags.join('\n')}`)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

      message.channel.send(embed);
    } else {
      let newSetting = args.slice(1).join(' ');

      switch (args[0]) {
        case 'disable': {
          if (!join.channel && !join.message) return message.inlineReply("<:unchecked:860839603098877953> • Le système d'arrivée n'est pas activé !");
          await client.updateGuild(message.guild, {
            join: { channel: null, message: null }
          });
          return message.channel.send("<:checked:860839605015412776> • Système de message d'arrivée désactivé.");
        }
        case 'message': {
          if (!newSetting) return message.channel.send('<:unchecked:860839603098877953> • Merci de spécifier un message.');
          if (newSetting.startsWith('{embed} ')) newSetting = client.helper.toEmbed(newSetting.slice(8));

          await client.updateGuild(message.guild, {
            join: { channel: join.channel, message: newSetting }
          });
          return message.channel.send(`<:checked:860839605015412776> • Le message d'arrivée a été correctement configuré !${join.channel == null ? '\nVous devriez maintenant définir un salon.' : ''}`);
        }
        case 'channel': {
          if (!message.mentions.channels.first()) return message.channel.send('<:unchecked:860839603098877953> • Merci de mentionner un salon.');
          const channel = message.mentions.channels.first();
          await client.updateGuild(message.guild, {
            join: { channel: channel.id, message: join.message }
          });
          return message.channel.send(`<:checked:860839605015412776> • Le salon d'arrivée a été correctement configuré !${join.message == null ? '\nVous devriez maintenant définir un message.' : ''}`);
        }
      }
    }
  }
};

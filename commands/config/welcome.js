const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'welcome',
  usage: 'welcome <message / channel / disable> <message / #salon>',
  description: "Donne l'état des paramètres du système de bienvenue, ou configure un message/salon.",
  category: 'Configuration',
  img: 'https://image.flaticon.com/icons/png/512/4712/4712109.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix, welcome } = await client.getGuild(message.guild);

    if (!args.length) {
      const embed = new MessageEmbed()
        .setColor(message.member.roles.highest.color || '')
        .setTitle('Paramètres du système de bienvenue :')
        .setDescription(`__Salon__ : ${welcome.channel == null ? '❌' : `<#${welcome.channel}>`}\n__Message__ : ${welcome.message == null ? '❌' : welcome.message}\n\n**Ajouter un salon :** \`${prefix}welcome channel [#salon]\`\n**Ajouter un message :** \`${prefix}welcome message [message]\`\n**Tags :**\n>>> ${client.helper.tags.join('\n')}`)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

      message.channel.send(embed);
    } else {
      let newSetting = args.slice(1).join(' ');

      switch (args[0]) {
        case 'disable': {
          await client.updateGuild(message.guild, {
            welcome: { channel: null, message: null }
          });
          return message.channel.send('<:checked:860839605015412776> • Système de message de bienvenue désactivé.');
        }
        case 'message': {
          if (!newSetting) return message.channel.send('<:unchecked:860839603098877953> • Merci de spécifier un message.');
          if (newSetting.startsWith('{embed} ')) newSetting = client.helper.toEmbed(newSetting.slice(8));

          await client.updateGuild(message.guild, {
            welcome: { channel: welcome.channel, message: newSetting }
          });
          return message.channel.send(`<:checked:860839605015412776> • Le message de bienvenue a été correctement configuré !${welcome.channel == null ? '\nVous devriez maintenant définir un salon.' : ''}`);
        }
        case 'channel': {
          if (!message.mentions.channels.first()) return message.channel.send('<:unchecked:860839603098877953> • Merci de mentionner un salon.');
          const channel = message.mentions.channels.first();
          await client.updateGuild(message.guild, {
            welcome: { channel: channel.id, message: welcome.message }
          });
          return message.channel.send(`<:checked:860839605015412776> • Le salon de bienvenue a été correctement configuré !${welcome.message == null ? '\nVous devriez maintenant définir un message.' : ''}`);
        }
      }
    }
  }
};

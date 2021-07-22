const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'embed',
  usage: 'embed <title> ; <description> ; <imageURL> ; <color>',
  description: "Envoie l'image de ta photo de profil ou de celle d'un autre utilisateur.",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/4151/4151168.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);

    message.delete();
    const _args = args.slice(0).join(' ').split(' ; ');

    if (_args.length === 1) return message.channel.send({ embed: { description: _args[0] } });

    const embed = new MessageEmbed()
      .setTitle(_args[0])
      .setDescription(_args[1])

    if (_args[2] && _args[2].startsWith('http')) embed.setImage(_args[2]);
    if (_args[2] && _args[2].startsWith('#')) embed.setColor(_args[2]);
    if (_args[3]) embed.setColor(_args[3] || `#${_args[3]}`);

    message.channel.send(embed);
  }
};

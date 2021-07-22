const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const moment = require('moment');

module.exports = {
  name: 'roleinfo',
  aliases: ['ri', 'inforole', 'ir'],
  usage: 'roleinfo [role]',
  description: 'Donne les informations suivantes sur un rôle :\n• Nom \n• ID \n• Couleur (en hex)\n• Nombre de membres possédant le rôle\n• Date de création\n• Position dans la liste\n• Permissions',
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/4406/4406353.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const role = client.detectRole(message, args);
    if (!role) return message.inlineReply('<:unchecked:860839603098877953> • Merci de spécifier un rôle valide.');

    const rolePermissions = role.permissions.toArray().join(', ');
    const permissions = rolePermissions.includes('ADMINISTRATOR') ? 'Administrateur' : client._helper('rolePermissionsTraductions', rolePermissions);

    const embed = new MessageEmbed()
      .setColor(role.hexColor)
      .addFields(
        { name: 'Nom', value: role.name, inline: true },
        { name: 'ID', value: role.id, inline: true },
        { name: 'Couleur', value: role.hexColor, inline: true },
        { name: 'Membres possédant le rôle', value: role.members.size, inline: true },
        { name: 'Création', value: moment(role.createdAt).format('DD/MM/YYYY'), inline: true },
        { name: 'Position', value: role.position, inline: true },
        { name: 'Permissions', value: permissions, inline: false }
      )

    message.channel.send(embed);
  }
};

const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'profile',
  aliases: ['p'],
  usage: 'profile',
  description: "Affiche votre profil listant :\n• Votre position\n• Votre argent\n• Votre niveau et l'XP requise avant le prochain\n• Votre XP\n• Vos objets",
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/708/708881.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    const user = await client.getUser(message.author);
    if (!user) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas commencé votre aventure !\nNe perdez pas de temps, faites la commande \`${prefix}startrpg\` !`);

    let healthBar = '';
    for (let i = 0; i !== user.hp.level; i++) {
      (i & 1) ? healthBar += '[▬](http://perdu.com)' : healthBar += '[▬](http://perdus.com)';
    }
    for (let i = 0; i !== user.hp.max - user.hp.level; i++) {
      healthBar += '▬';
    }

    let itemsList = '';
    for (let i = 0; i !== user.items.length; i++) {
      if (!itemsList.includes(user.items[i])) {
        itemsList += `• ${user.items[i]}\n`;
      } else {
        const reg = new RegExp(`${user.items[i]} \\(×\\d*\\)`, 'gi').exec(itemsList);
        const n = user.items.toObject().filter(item => item === user.items[i]).length;
        if (!reg) itemsList = itemsList.replace(user.items[i], `${user.items[i]} (×${n})`);
      }
    }

    const embed = new MessageEmbed()
      .setColor(user.profile.color || `#${user.profile.color}`)
      .setTitle(`Profil de ${message.author.username} :`)
      .setDescription(`🧪 ${healthBar}\n*${user.hp.level}/${user.hp.max}*\n\n🗺️ __Position actuelle__ : **${user.position}**\n<:po:860840271675654145> __Pièces d'or__ : **${user.coins}**\n👑 __Niveau__ : **${client.calculateLevel(user.xp)[0]}** [ xp restant : **${client.calculateLevel(user.xp)[1]}** ]\n🪁 __Expérience__ : **${user.xp}**\n\n📦 __Objets__ :\n${itemsList || '*Aucun objet*'}`)
      .setThumbnail(message.author.avatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

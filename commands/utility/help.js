const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'help',
  usage: 'help <commande>',
  description: "Envoie la page d'aide, générale ou portant sur une commande en particulier.",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/2933/2933296.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { commands } = client;
    const commandsList = {};

    if (!args.length) {
      for (const [key, value] of commands) {
        if (value.category !== 'Développeur' && value.category !== 'Musique' && value.category !== 'RPG' && value.category) commandsList[value.category] = [];
      }
      for (const [key, value] of commands) {
        if (value.category !== 'Développeur' && value.category !== 'Musique' && value.category !== 'RPG' && value.category) commandsList[value.category].push(value.name);
      }

      const embed = new MessageEmbed()
        .setColor(message.member.roles.highest.color || '')
        .setTitle("Page d'aide")
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription('Faites « !help [commande] » pour obtenir des informations plus précises sur une commande !')
        .setThumbnail('https://webstockreview.net/images/anime-flower-png-5.png')
        .setFooter(`${client.user.username} par ${(await client.fetchApplication()).owner.tag}`, client.user.displayAvatarURL({ dynamic: true }))

      Object.keys(commandsList).forEach(key => {
        embed.addField(`${client._helper('categoriesEmojis', key)} **${key}**`, `> \`${commandsList[key].join('`, `')}\`\n${key === 'Social' ? `\n[Inviter le bot](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands%20identify) • [Serveur support](https://discord.gg/NMmqJ3h5s7)` : '\u00AD'}`, false);
      });

      message.channel.send(embed);
    } else {
      const name = args[0];
      const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

      if (!command) return message.channel.send("<:unchecked:860839603098877953> • Cette commande n'existe pas.");

      client.sendHelpPage(command.name, message);
    }
  }
};

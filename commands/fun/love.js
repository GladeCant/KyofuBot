const { Message, MessageAttachment, MessageEmbed, User } = require('discord.js');
const Client = require('../../struct/Client');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'love',
  aliases: ['ship'],
  usage: 'love [user] <user>',
  description: "Génère le pourcentage d'amour entre deux membres.",
  category: 'Fun',
  img: 'https://image.flaticon.com/icons/png/512/3208/3208707.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);

    let usr1 = args.length > 1 ? client.detectUser(message, args[0]) || args[0] : message.author;
    let usr2 = args.length > 1 ? client.detectUser(message, args[1]) || args.slice(1).join(' ') : client.detectUser(message, args[0]) || args.join(' ');
    if (!usr1 || !usr2) return message.inlineReply(args.length === 2 ? "<:unchecked:860839603098877953> • L'un des deux membres est invalide." : '<:unchecked:860839603098877953> • Membre spécifié invalide.');

    if (usr1 instanceof User) usr1 = usr1.username;
    if (usr2 instanceof User) usr2 = usr2.username;

    let usersLove = await client.getLove(`${usr1} & ${usr2}`) || await client.getLove(`${usr1} & ${usr2}`);

    if (!usersLove) {
      const n = client.getRandomInt(100);
      const newShip = {
        users: `${usr1} & ${usr2}`,
        level: n
      }

      await client.createLove(newShip);
      usersLove = await client.getLove(`${usr1} & ${usr2}`);
    }

    const loveLevel = await usersLove.level;

    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const msg = await message.channel.send({ embed: { description: '<a:CGear:745285621152743505> • Calcul en cours...' } })
    try {
      const avatar = await loadImage(message.guild.members.cache.find(m => m.user.username === usr1).user.displayAvatarURL({ format: 'png', size: 512 }));
      ctx.drawImage(avatar, 0, 0, 250, canvas.height);

      const avatar2 = await loadImage(message.guild.members.cache.find(m => m.user.username === usr2).user.displayAvatarURL({ format: 'png', size: 512 }));
      ctx.drawImage(avatar2, 270, 0, 250, canvas.height);

      const heart = await loadImage('https://images.vexels.com/media/users/3/176067/isolated/preview/da1d4860a08963ab6946ce0e3c7a822a-heart-flat-by-vexels.png');
      ctx.drawImage(heart, 210, 0, 100, 100);

      var attachment = await new MessageAttachment(canvas.toBuffer(), 'result.png');
    } catch {};

    const commentary = Object.entries(client.helper.shipMessages).find(m => m[1].includes(parseInt(loveLevel)))[0];

    const embed = new MessageEmbed()
      .setColor('#ec41f1')
      .setTitle(`${usr1} + ${usr2} = ${loveLevel}% !`)
      .setDescription(commentary)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    if (attachment) embed.attachFiles(attachment).setImage('attachment://result.png');

    await message.channel.send(embed);
    msg.delete();
  }
};

const { Message, MessageAttachment, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'position',
  aliases: ['pos'],
  usage: 'position',
  description: 'Envoie votre position sur la carte.',
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/2942/2942917.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    const user = await client.getUser(message.author);
    if (!user) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas commencé votre aventure !\nNe perdez pas de temps, faites la commande \`${prefix}startrpg\` !`);

    message.channel.startTyping(5);

    const canvas = createCanvas(1024, 768);
    const ctx = canvas.getContext('2d');

    const map = await loadImage('https://inkarnate-api-as-production.s3.amazonaws.com/uzlayl7m0odz0h4t9fiv9fjt6bca');
    const position = await loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/1200px-Map_pin_icon.svg.png');

    switch (user.position) {
      case '⚓ Port Isonvale': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 115, 245, 39, 54);
        break;
      }
      case '🏘️ Karthmere': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 68, 114, 39, 54);
        break;
      }
      case '🏰 Karthmere Castle': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 33, 43, 39, 54);
        break;
      }
      case '🌄 Western Plains': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 280, 95, 39, 54);
        break;
      }
      case '🏘️ Whiteridge': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 262.245435234543, 287, 39, 54);
        break;
      }
      case '🌊 Sea of Daggers': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 255, 379, 39, 54);
        break;
      }
      case '🪨 The Desolate Wastelands': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 160, 460, 39, 54);
        break;
      }
      case '🪨 Hollow Valley': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 418, 317, 39, 54);
        break;
      }
      case '🏘️ Oakmount': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 280, 522, 39, 54);
        break;
      }
      case '🌳 The Shimmering Cliffs': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 482, 584, 39, 54);
        break;
      }
      case '🌳 Devilwood Forest': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 414, 642, 39, 54);
        break;
      }
      case '🏘️ Farwood': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 540, 450, 39, 54);
        break;
      }
      case '🌊 Tranquil Lake': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 621, 321, 39, 54);
        break;
      }
      case '🌊 The Emerald Gulf': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 766, 523, 39, 54);
        break;
      }
      case '🏘️ Bleakburn': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 828, 525, 39, 54);
        break;
      }
      case '🏘️ Edham': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 789, 355, 39, 54);
        break;
      }
      case '🏘️ Grimhelm': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 966, 361, 39, 54);
        break;
      }
      case '🏘️ The Shrieking Isle': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 942, 103, 39, 54);
        break;
      }
      case '🌳 The Boundless Highlands': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 725, 159, 39, 54);
        break;
      }
      case '🏘️ Larnwick': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 557, 172, 39, 54);
        break;
      }
      case '🏘️ Archester': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 698, 36, 39, 54);
        break;
      }
      case '🏔️ The Frigid Peaks': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 760, 0, 39, 54);
        break;
      }
      case '🍂 Dark Mire': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 413, 100, 39, 54);
        break;
      }
      case '🏘️ Wellspring': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 478, 0, 39, 54);
        break;
      }
      case '🏘️ Windermere': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 325, 53, 39, 54);
        break;
      }
      case '❄️ Everwinter': {
        ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(position, 930, 643, 39, 54);
        break;
      }
    }

    const attachment = new MessageAttachment(canvas.toBuffer(), 'position.png');

    const embed = new MessageEmbed()
      .setTitle(`Position de ${message.author.username} :`)
      .setDescription(`**${user.position}**`)
      .attachFiles(attachment)
      .setImage('attachment://position.png')

    message.channel.stopTyping(true);

    console.log('taratata de trompette de CAmembert NON !!!!!!!!!!!!!!!!!');
    message.channel.send(embed);
    return;
  }
};
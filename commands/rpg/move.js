const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'move',
  usage: 'move [zone]',
  description: "Vous déplace dans une zone conjointe à l'actuelle.\nVous pouvez vous rendre à chaque endroit portant un nom sur la carte.",
  category: 'RPG',
  img: 'https://image.flaticon.com/icons/png/512/1089/1089233.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const { prefix } = await client.getGuild(message.guild);

    const user = await client.getUser(message.author);
    if (!user) return message.inlineReply(`<:unchecked:860839603098877953> • Vous n'avez pas commencé votre aventure !\nNe perdez pas de temps, faites la commande \`${prefix}startrpg\` !`);

    if (!args.length) return client.sendHelpPage(this.name, message);

    const currentPlace = await client.getPosition(message.author);

    const requestedPlace = args.join(' ');
    const movingPossibilities = currentPlace._doc.movingPossibilities;

    if (await !client.getPosition(args.join(' '))) return message.inlineReply("<:unchecked:860839603098877953> • Cette zone n'existe pas.");

    let msg = true;

    for (let i = 0; movingPossibilities.length > i; i++) {
      const place = movingPossibilities[i];
      const _place = movingPossibilities[i].replace(' (Bateau)', '');
      if (place === requestedPlace || place.substring(1) === requestedPlace || place.substring(2) === requestedPlace || movingPossibilities[i].substring(3) === requestedPlace || movingPossibilities[i].substring(4) === requestedPlace) {
        msg = false;
        await client.updateUser(message.author, {
          position: place
        });
        message.channel.send(`<:checked:860839605015412776> • **${message.author.username}** se rend à **${place}** !`);
        break;
      } else
      if ((place.endsWith('(Bateau)')) && (_place === requestedPlace || _place.substring(1) === requestedPlace || _place.substring(2) === requestedPlace || _place.substring(3) === requestedPlace || _place.substring(4) === requestedPlace)) {
        if (user.items.toObject().includes('⛵ Bateau')) {
          msg = false;
          await client.updateUser(message.author, {
            position: _place
          });
          message.channel.send(`<:checked:860839605015412776> • **${message.author.username}** se rend à **${place.replace(' (Bateau)', '')}** en bateau ! ⛵`);
          break;
        } else {
          msg = false;
          message.inlineReply('<:unchecked:860839603098877953> • Vous ne pouvez pas vous rendre dans cette zone : il vous faut un bateau !');
          break;
        }
      }
    }

    if (msg) message.inlineReply('<:unchecked:860839603098877953> • Vous ne pouvez pas vous rendre dans cette zone.');
  }
};

// À RETRAVAILLER (c'est un peu le bordel là)

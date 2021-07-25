const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'todo',
  usage: 'todo [list / add <tâche> / remove <numéro> / clear]',
  description: 'Gère ta liste de choses à faire : consulte-la, ajoute-lui une tâche, enlèves-en ou purge-la.',
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/3176/3176292.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    let todo = await client.getTodo(message.author);

    if (!todo) {
      await client.createTodo(message.author);
      todo = await client.getTodo(message.author);
    }

    switch (args[0]) {
      case undefined:
      case 'list': {
        const list = todo.list.length ? `• ${todo.list.join('\n• ')}` : '*Votre liste est vide.*';

        const embed = new MessageEmbed()
          .setColor(message.member.roles.highest.color || '')
          .setTitle(`Todo list - ${message.author.username}`)
          .setDescription(list)

        return message.channel.send(embed);
      }
      case 'add': {
        const newThing = args.slice(1).join(' ');
        todo.list.push(newThing);

        await client.updateTodo(message.author, { list: todo.list });
        return message.channel.send(`<:checked:860839605015412776> • Ajouté à la liste : \`${newThing}\``);
      }
      case 'delete':
      case 'remove': {
        const number = parseInt(args[1]);
        if (isNaN(number)) return message.inlineReply('<:unchecked:860839603098877953> • Invalide numéro spécifié.');

        const list = todo.list;

        if (number === 0) return message.inlineReply("<:unchecked:860839603098877953> • C'est ça, oui.");
        if (number > list.length) return message.inlineReply(`<:unchecked:860839603098877953> • Vous ne possédez pas de tâche n°**${number}**. Essayez plus bas.`);

        const task = list[number - 1];
        list.splice(list.indexOf(list[number - 1]), 1);

        await client.updateTodo(message.author, { list: list });
        return message.channel.send(`<:checked:860839605015412776> • Fait : \`${task}\` ─ retiré de la liste.`);
      }
      case 'clear':
      case 'purge': {
        todo.list = [];

        await client.updateTodo(message.author, { list: todo.list });
        return message.channel.send('<:checked:860839605015412776> • Todo list réinitialisée.');
      }
      default: {
        return client.sendHelpPage(this.name, message);
      }
    }
  }
};

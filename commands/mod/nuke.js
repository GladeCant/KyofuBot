const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'nuke',
  usage: 'nuke <#channel>',
  description: "Clone un salon et supprimer l'ancien, ce qui a pour effet de purger tous les messages.",
  category: 'Modération',
  img: 'https://image.flaticon.com/icons/png/512/3399/3399082.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    if (!message.member.hasPermission('MANAGE_MESSAGES', { checkAdmin: true, checkOwner: true })) return message.inlineReply('<:unchecked:860839603098877953> • Vous ne possédez pas la permission de supprimer des messages. (Requis : `Gérer les messages`.)');

    const channel = args.length ? message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id === args[0] || c.name === args.join(' ').replace('#', '')) : message.channel;
    if (!channel) return message.inlineReply('<:unchecked:860839603098877953> • Invalide salon spécifié.');

    message.channel.send(`⚠️ • **Attention !** Vous vous apprêtez à supprimer l'ensemble des messages de <#${channel.id}>. Voulez-vous vraiment continuer ?\nTapez \`nuke\` pour confirmer ou \`cancel\` pour annuler.`).then(async msg => {
      const filter = _message => ['nuke', 'cancel'].includes(_message.content.toLowerCase()) && _message.author.id === message.author.id
      const collector = await message.channel.awaitMessages(filter, { max: 1, time: 20000 });
      const proceed = collector.first() ? collector.first().content.toLowerCase() === 'nuke' ? true : false : undefined;

      if (proceed === undefined) return message.channel.send('Temps écoulé : commande annulée.');
      if (proceed === false) return message.channel.send('Commande annulée.');
      else {
        channel.clone({ position: channel.position + 2 }).then(async newChannel => {
          await channel.delete();
          newChannel.send('<:checked:860839605015412776> • Salon entièrement nettoyé.').then(msg => {
            msg.delete({ timeout: 10000 });
          });
        });
      }
    });
  }
};

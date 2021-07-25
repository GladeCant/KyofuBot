const { Message } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'simulate',
  usage: 'simulate [join / leave]',
  description: 'Simule une arrivée ou un départ.',
  category: 'Configuration',
  img: 'https://image.flaticon.com/icons/png/512/900/900834.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args.length || (args[0] !== 'join' && args[0] !== 'leave')) return client.sendHelpPage(this.name, message);

    switch (args[0]) {
      case 'join': {
        const { join } = await client.getGuild(message.guild);
        if (!join.channel || !join.message) return message.inlineReply("<:unchecked:860839603098877953> • Le système d'arrivée n'est pas en place !");
        return client.emit('guildMemberAdd', (client, message.member));
      }
      case 'leave': {
        const { leave } = await client.getGuild(message.guild);
        if (!leave.channel || !leave.message) return message.inlineReply("<:unchecked:860839603098877953> • Le système de départ n'est pas en place !");
        return client.emit('guildMemberRemove', (client, message.member));
      }
    }
  }
};

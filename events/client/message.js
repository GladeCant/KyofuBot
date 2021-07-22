const { Message } = require('discord.js');
const Client = require('../../struct/Client');

/**
 * The message event, emitted when a message is sent.
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  client.logMessage(message);
  
  if (message.channel.type === 'dm') return;
  if (message.author.bot) return;

  const settings = await client.getGuild(message.guild);
  const prefix = settings.prefix;
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix) && !message.mentions.members.first()) return;

  const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

  if (!cmd || !cmd.name || (cmd.category === 'RPG' && message.author.id !== '689451764310999042')) {
    if (message.mentions.members.first() && message.mentions.members.first().user === client.user) message.inlineReply(`Mon préfixe sur ce serveur est \`${prefix}\` !`);
    return;
  }

  try {
    cmd.execute(client, message, args, settings);
  } catch (error) {
    if (!error.stack.includes('Missing Permissions')) message.author.id !== '689451764310999042' ? message.channel.send('⚠️ • **Un bug sauvage est apparu !** Et a été signalé au développeur – qui, espérons-le, réglera le problème le plus vite possible. Merci de patienter !') : message.channel.send('⚠️ • Oups. Une erreur.');
    else message.channel.send('🛠️ • Certaines permissions me manquent pour effectuer cette commande. Vérifiez bien que je sois administratrice sur le serveur.');
    client.logError(error);
  }
}

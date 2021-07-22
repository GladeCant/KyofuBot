const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');

module.exports = {
  name: 'spotify',
  usage: 'spotify [membre]',
  description: "Envoie les informations sur la musique qu'écoute un membre sur Spotify.",
  category: 'Utilitaire',
  img: 'https://image.flaticon.com/icons/png/512/174/174872.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    const user = args.length ? client.detectUser(message, args) : message.author;
    if (!user) return message.inlineReply('<:unchecked:860839603098877953> • Utilisateur spécifié invalide.');

    const activity = user.presence.activities.find(a => a.name === 'Spotify' && a.type === 'LISTENING');
    if (!activity) return message.inlineReply(`<:unchecked:860839603098877953> • ${user === message.author ? "Tu n'écoutes" : `**${user.username}** n'écoute`} pas Spotify en ce moment – ou c'est un fichier local ou indétectable.`);

    const trackImg = activity.assets.largeImage ? `https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}` : 'https://image.flaticon.com/icons/png/512/174/174872.png';
    const trackURL = activity.syncID ? `https://open.spotify.com/track/${activity.syncID}` : '';
    const trackName = activity.details;
    const trackAuthor = activity.state;
    const trackAlbum = activity.assets.largeText;

    const embed = new MessageEmbed()
      .setColor('#01DF01')
      .setTitle(`${user.tag} écoute Spotify :`)
      .setDescription(trackURL)
      .setThumbnail(trackImg)
      .addFields(
        { name: 'Musique', value: trackName, inline: false },
        { name: 'Album', value: trackAlbum, inline: false },
        { name: 'Artiste', value: trackAuthor, inline: false }
      )
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    message.channel.send(embed);
  }
};

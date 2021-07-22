const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const got = require('got');

module.exports = {
  name: 'meme',
  usage: 'meme',
  description: 'Envoie un meme aléatoire.',
  category: 'Fun',
  img: 'https://image.flaticon.com/icons/png/512/356/356731.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  execute(client, message, args) {
    got('https://www.reddit.com/r/memes/random/.json').then(response => {
      const [list] = JSON.parse(response.body);
      const [post] = list.data.children;

      const permalink = post.data.permalink;
      const redditUrl = `https://reddit.com/r/${post.data.subreddit}`
      const postUrl = `https://reddit.com${permalink}`;
      const image = post.data.url;
      const title = post.data.title;
      const upvotes = post.data.ups;
      const numComments = post.data.num_comments;

      const embed = new MessageEmbed()
        .setColor(message.member.roles.highest.color || '')
        .setTitle(title)
        .setURL(redditUrl)
        .setDescription(`[Go to the post](${postUrl}) ─ 👍 ${upvotes} • 🗨️ ${numComments}`)
        .setImage(image)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL())

      message.channel.send(embed);
    });
  }
};

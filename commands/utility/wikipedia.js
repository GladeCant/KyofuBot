const { Message, MessageEmbed } = require('discord.js');
const Client = require('../../struct/Client');
const wiki = require('wikipedia');

module.exports = {
  name: 'wikipedia',
  aliases: ['wiki'],
  usage: 'wikipedia [terme] <-d>',
  description: 'Envoie, si elle existe, la page [wikipédia](https://fr.wikipedia.org/) correspondant au terme mentionné.\nLe paramètre `-d` (pour "détails") est facultatif ; il enverra des informations plus complètes.',
  category: 'Utilitaire',
  img: 'https://fr.wikipedia.org/static/images/mobile/copyright/wikipedia.png',

  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  async execute(client, message, args) {
    if (!args.length) return client.sendHelpPage(this.name, message);

    const details = message.content.endsWith('-d') ? true : false;
    const term = args.join(' ').replace('-d', '');

    try {
      await wiki.setLang('fr')
      const page = await wiki.page(term.toLowerCase());
      const summary = await page.summary();

      const img = summary.thumbnail ? summary.thumbnail.source : 'https://fr.wikipedia.org/static/images/mobile/copyright/wikipedia.png';
      const url = summary.content_urls.desktop.page;
      const title = summary.title;
      const shortIntro = summary.extract;
      const intro = await page.intro();

      const embed = new MessageEmbed()
        .setColor(message.member.roles.highest.color)
        .setTitle(title)
        .setURL(url)
        .setDescription(`${details === true ? rdc(intro) : rdc(shortIntro)}\n<:__:862646139295760394>`)
        .setThumbnail(img)
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

      message.channel.send(embed)

    } catch (error) {
      if (error.stack.includes('No page with given title exists') || error.stack.includes("Cannot read property 'desktop' of undefined")) return message.channel.send("<:unchecked:860839603098877953> • Cette page Wikipédia est inexistante.\nPeut-être n'avez-vous pas spécifié le terme exact : faites attention aux accents, ils sont importants.");
      else client.logError(error);
    }
  }
};

/**
 * Replace duplicated commas in a string.
 * @param {String} string 
 */
function rdc(string) {
  string = string.replace(/,{2,}/g, ',');
  if (string.includes(/,\./g.exec(string))) string = string.replace(/,\./g, '.');
  return string;
}
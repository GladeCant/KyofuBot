const { Structures } = require('discord.js');
const Client = require('./Client');

/**
 * Represents a Discord User.
 */
class User extends Structures.get('User') {
  /**
   * @param {Client} client 
   * @param {Object} data 
   */
  constructor (client, data) {
    super(client || {}, data || {});
  }
  
  bannerURL(id, hash, options) {
    
  }

  /**
   * Display the user banner URL. If don't, return null.
   * @param {import("discord.js").ImageURLOptions} [options] Options for the image
   * @returns {Promise<?string>}
   */
  async displayBannerURL(options = {}) {
    const user = await this.client.fetchUserAPI(this.id);
    const banner = user.banner;
    const { format = 'png', size = 4096, dynamic = false } = options;
    
    if (banner) return `https://cdn.discordapp.com/banners/${this.id}/${banner}.${dynamic === true ? `${banner.startsWith('a_') ? 'gif' : 'png'}` : format}?size=${size}`;
    else return null;
  }
}

Structures.extend('User', () => User);

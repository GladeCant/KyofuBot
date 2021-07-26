const { Structures } = require('discord.js');

/**
 * Represents a Discord User.
 */
class User extends Structures.get('User') {
  /**
   * Display the user banner URL. If don't, return null.
   * @param {import("discord.js").ImageURLOptions} [options] Options for the image
   * @returns {Promise<?String>}
   */
  async displayBannerURL(options = {}) {
    const user = await this.client.api.users(this.id).get();
    const { format = 'png', size = 4096, dynamic = false } = options;

    if (user.banner) return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${dynamic === true ? `${user.banner.startsWith('a_') ? 'gif' : format}` : format}?size=${size}`;
    else return null;
  }
}

Structures.extend('User', () => User);

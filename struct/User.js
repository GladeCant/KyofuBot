const { Structures } = require('discord.js');

/**
 * Represents a Discord User.
 */
class User extends Structures.get('User') {
  constructor(client, data) {
    super(client, data);

    (async () => {
      console.log(data)
      const user = await this.client.api.users(data.id).get();
      return user;
    })().then(user => {
        /**
         * The ID of the user's banner.
         * @type {?String}
         */
        this.banner = user.banner;
    });
  }

  /**
   * Display the user banner URL. If don't, return null.
   * @param {import("discord.js").ImageURLOptions} [options] Options for the image
   * @returns {Promise<?String>}
   */
  displayBannerURL(options = {}) {
    const { format = 'png', size = 4096, dynamic = false } = options;
    
    if (this.banner) return `https://cdn.discordapp.com/banners/${this.id}/${this.banner}.${dynamic === true ? `${this.banner.startsWith('a_') ? 'gif' : format}` : format}?size=${size}`;
    else return null;
  }
}

Structures.extend('User', () => User);

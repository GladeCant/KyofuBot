const { MessageEmbed } = require('discord.js');

/**
 * Represents a MessageEmbed.
 * @extends {MessageEmbed}
 */
class ExtendedMessageEmbed extends MessageEmbed {
  /**
   * Potentially add a field.
   * @param {Boolean} condition The condition which determine if field is added
   * @param {String} name The name of the field
   * @param {String} value The value of the string
   * @param {Boolean} [inline] If the field is inline
   * @returns {this}
   */
  addPotentialField(condition, name, value, inline = false) {
    if (condition) return super.addField(name, value, inline);
    else return this;
  }

  /**
   * Potentially set an image.
   * @param {Boolean} condition The condition which determine if image is set
   * @param {String} url The image url
   * @returns {ExtendedMessageEmbed}
   */
  setPotentialImage(condition, url) {
    if (condition) super.setImage(url);
    return this;
  }
}

module.exports = ExtendedMessageEmbed;

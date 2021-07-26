const Client = require('./Client');
const Pnj = require('../models/pnj');
const User = require('../models/user');
const Zone = require('../models/zone');
const Item = require('../models/item');

class Rpg {
  constructor(client) {
    /**
     * The Kyofu Client.
     * @type {Client}
     */
    this.client = client;
  }

  /**
   * Add HP to an user.
   * @param {User} user The user to add HP
   * @param {Number} hp The HP level
   */
  async addHP(user, hp) {
    const _user = await this.getUser(user);
    let hpLevel = _user.hp.level;

    for (let i = 0; hp > i; i++) {
      if (hpLevel < _user.hp.max) {
        hpLevel++;
        await this.updateUser(user, { hp: { level: hpLevel, max: _user.hp.max } });
      } else break;
    }
  }

  /**
   * Define the level based on the number of experience points.
   * @param {Number} xp The xp level
   * @returns {Number[]}
   */
  calculateLevel(xp) {
    const levelUser = Math.floor(0.25 * Math.sqrt(xp));
    const pointsNextLevel = Math.pow((levelUser + 1) * 4, 2);
    const requiredPoints = pointsNextLevel - xp;

    return [levelUser, requiredPoints, pointsNextLevel];
  }

  /**
   * Add a new user to the database.
   * @param {User} user The user parameters
   * @param {Object} [options] The additional options
   * @param {Number} [options.xp] The user xp level
   * @param {Object} [options.hp] The user hp parameters
   * @param {Number} [options.hp.level] The user hp level
   * @param {Number} [options.hp.max] The highest possible hp level attainable by the member
   * @param {Number} [options.coins] The user coins
   * @param {Array} [options.items] The user inventory
   * @param {Object} [options.profile] The user profile parameters
   * @param {String} [options.profile.color] The hex color of the member profile
   * @param {String} [options.position] The member position on the map
   * @param {Object} [options.quests] The member quests parameters
   */
  async createUser(user, options = {}) {
    const { xp = 0, hp = { level: 20, max: 20 }, coins = 10, items = [], profile = { color: '#54abeb' }, position = '⚓ Port Isonvale', quests = [] } = options;
    const merged = await Object.assign({ _id: mongoose.Types.ObjectId(), userID: user.id, userName: user.username, xp, hp, coins, items, profile, position, quests });
    const createUser = await new User(merged);
    return await createUser.save();
  }

  /**
   * Remove an user from the database.
   * @param {User} user The user to remove
   */
  async deleteUser(user) {
    if (!this.getUser(user)) return;
    return await User.deleteOne({ userID: user.id });
  }

  /**
   * Find an item in the database.
   * @param {String} name The item name
   */
  async getItem(name) {
    const data = await Item.findOne({ name: { $regex: new RegExp(`${name}`, 'gi') || new RegExp(`${name}|:\\w*:`, 'gi') } });
    return data;
  }

  /**
   * Find a pnj in the database.
   * @param {String} pnjName The pnj name
   */
  async getPnj(pnjName) {
    const data = await Pnj.findOne({ name: pnjName });
    return data;
  }

  /**
   * Find the position of an user in the database.
   * @param {User|String} userOrPosition The user or position
   */
  async getPosition(userOrPosition) {
    const _user = await this.getUser(userOrPosition);
    const data = await Zone.findOne({ name: _user ? _user.position : userOrPosition });
    return data;
  }

  /**
   * Find an user in the database.
   * @param {User} user The user to find
   */
  async getUser(user) {
    const data = await User.findOne({ userID: user.id });
    return data;
  }

  /**
   * Send a dialog box of a pnj.
   * @param {String} pnjName The pnj name
   * @param {Number} n The number of the dialog box
   * @param {Message} message The sent message
   */
  async pnj(pnjName, n, message) {
    const pnj = await this.getPnj(pnjName);

    const embed = new MessageEmbed()
      .setColor(pnj.color)
      .setTitle(pnj.name)
      .setDescription(`─ ${pnj.dialogs[n]}`)
      .setThumbnail(pnj.img)

    return message.channel.send(embed);
  }

  /**
   * Edit parameters of an item in the database.
   * @param {Stirng} name The item name
   * @param {Object} settings The new value(s) for the item
   */
  async updateItem(name, settings) {
    const data = await this.getItem(name);
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  }

  /**
   * Edit parameters of an user in the database.
   * @param {User} user The user to edit
   * @param {Object} settings The new value(s) for the user
   */
  async updateUser(user, settings) {
    const data = await this.getUser(user);
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  }
}

module.exports = Rpg;

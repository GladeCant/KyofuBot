const mongoose = require('mongoose');
const { Client, Collection, User, Guild, Message, GuildMember, Role } = require('discord.js');
const MessageEmbed = require('./MessageEmbed');
const helper = require('../util/helper');
const { readdirSync } = require('fs');
const fetch = require('node-fetch');
const { defaultSettings, token } = require('../util/config');
const _Guild = require('../models/guild');
const Hate = require('../models/hate');
const Item = require('../models/item');
const Todo = require('../models/todo')
const Love = require('../models/love');
const Member = require('../models/member.js');
const Pnj = require('../models/pnj');
const _User = require('../models/user');
const Zone = require('../models/zone');

/**
 * Represents a Discord Client.
 * @extends Client
 */
class KyofuClient extends Client {
  constructor(options) {
    super(options.clientOptions || {});

    /**
     * All the commands of the bot.
     * @type {Collection}
     */
    this.commands = new Collection();

    /**
     * Helper for some stuff.
     * @type {helper}
     */
    this.helper = helper;
  }

  /**
   * Load all the commands of the bot.
   */
  loadCommands() {
    const commandsFolder = readdirSync('./commands');

    for (const folder of commandsFolder) {
      const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        this.commands.set(command.name, command);
      }
    }
  }

  /**
   * Load all the events of the bot.
   */
  loadEvents() {
    const eventsFolder = readdirSync('./events');

    for (const folder of eventsFolder) {
      const eventFiles = readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));

      for (const file of eventFiles) {
        const event = require(`../events/${folder}/${file}`);
        if (folder === 'client') this.on(file.split('.')[0], event.bind(null, this));
      }
    }
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
   * Add a new guild to the database.
   * @param {Guild} guild The guild
   * @param {Object} options The guild options
   * @param {String} options.prefix The prefix of the guild
   * @param {Object} options.leave The leave system on the guild
   * @param {?String} options.leave.channel The id of the leave system channel
   * @param {?String} options.leave.message The leave system message
   * @param {Object} options.join The join system on the guild
   * @param {?String} options.join.channel The id of the join system channel
   * @param {?String} options.join.message The join system message
   */
  async createGuild(guild, options) {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId(), guildID: guild.id, guildName: guild.name }, options);
    const createGuild = await new _Guild(merged);
    return await createGuild.save();
  }

  /**
   * Add a new level of hate between two users to the database.
   * @param {Object} hate The hate level parameters
   * @param {String} hate.users The two users
   * @param {Number} hate.level The level of hate
   */
  async createHate(hate) {
    const merged = await Object.assign({ _id: mongoose.Types.ObjectId() }, hate);
    const createHate = await new Hate(merged);
    return await createHate.save();
  }

  /**
   * Add a new level of love between two users to the database.
   * @param {Object} love The love level parameters
   * @param {String} love.users The two users
   * @param {Number} love.level The level of love
   */
  async createLove(love) {
    const merged = await Object.assign({ _id: mongoose.Types.ObjectId() }, love);
    const createLove = await new Love(merged);
    return await createLove.save();
  }

  /**
   * Add a new member to the database.
   * @param {GuildMember} member The member
   * @param {Guild} guild The guild where to add the member
   * @param {Object} [options] The additional options
   * @param {Array} [options.warns] The warns of the member on the guild
   */
  async createMember(member, guild, options) {
    const merged = await Object.assign({ _id: mongoose.Types.ObjectId(), userID: member.id, userName: member.user.username, guildID: guild.id, guildName: guild.name }, options);
    const createMember = await new Member(merged);
    return await createMember.save();
  }

  /**
   * Create a new todo list for a member.
   * @param {User} user The user
   * @param {Object} [options] The additional options
   * @param {Array} [options.list] The todo list of the user
   */
  async createTodo(user, options = {}) {
    const { list = [] } = options;
    const merged = await Object.assign({ _id: mongoose.Types.ObjectId(), userID: user.id, userName: user.username, list: list });
    const createTodo = await new Todo(merged);
    return await createTodo.save();
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
    const createUser = await new _User(merged);
    return await createUser.save();
  }

  /**
   * Remove an user from the database.
   * @param {User} user The user to remove
   */
  async deleteUser(user) {
    if (!this.getUser(user)) return;
    return await _User.deleteOne({ userID: user.id });
  }

  /**
   * Remove a guild from the database.
   * @param {Guild} guild The guild to remove
   */
  async deleteGuild(guild) {
    if (!this.getGuild(guild)) return;
    return await _Guild.deleteOne({ guildID: guild.id });
  }

  /**
   * @typedef {Object} APIUser
   * @property {String} avatar The user's avatar hash
   * @property {?String} banner The user's banner hash
   * @property {?String} banner_color The user's banner color
   * @property {String} discriminator The user's discriminator
   * @property {String} id The id of the user
   * @property {Number} public_flags The flags of the user
   * @property {String} username The username of the user
   */
  /**
   * Fetch an user (Discord API).
   * @param {String} id The user ID
   * @returns {APIUser} The user data from Discord API
   */
  async fetchUserAPI(id) {
    const response = await fetch(`https://discord.com/api/users/${id}`, {
      headers: {
        Authorization: `Bot ${token}`
      }
    });
    if (!response.ok) throw new Error(`Error status code: ${response.status}`);
    return response.json();
  }

  /**
   * Find a guild in the database.
   * @param {Guild} guild The guild to find
   */
  async getGuild(guild) {
    try {
      const data = await _Guild.findOne({ guildID: guild.id });
      if (data) return data;
      else return defaultSettings;
    } catch {
      return defaultSettings;
    }
  }

  /**
   * Find a hate level between two users in the database.
   * @param {String} users The two users
   */
  async getHate(users) {
    const data = await Hate.findOne({ users: users });
    return data;
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
   * Find a love level between two users in the database.
   * @param {String} users The two users
   */
  async getLove(users) {
    const data = await Love.findOne({ users: users });
    return data;
  }

  /**
   * Find a member in the database.
   * @param {GuildMember} member The member to find
   * @param {Guild} guild The guild of the member
   */
  async getMember(member, guild) {
    const data = await Member.findOne({ userID: member.id, guildID: guild.id });
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
   * Choose an aleatory number between 0 and max.
   * @param {Number} max The max number
   * @returns {Number}
   */
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  /**
   * Choose an aleatory number between min and max.
   * @param {Number} min
   * @param {Number} max
   * @returns {Number}
   */
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  /**
   * Find an user's todo list in the database.
   * @param {User} user The user whose to find list
   */
  async getTodo(user) {
    const data = await Todo.findOne({ userID: user.id });
    return data;
  }

  /**
   * Find an user in the database.
   * @param {User} user The user to find
   */
  async getUser(user) {
    const data = await _User.findOne({ userID: user.id });
    return data;
  }

  /**
   * Transform something with the helper page.
   * @param {String} name The name of the helper element
   * @param {String} target What you want to transform
   */
  _helper(name, target) {
    const pageHelper = this.helper[name];
    for (let i = 0; Object.keys(pageHelper).length > i; i++) {
      if (target.includes(Object.keys(pageHelper)[i])) target = target.replace(Object.keys(pageHelper)[i], Object.values(pageHelper)[i]);
    }
    return target;
  }

  /**
   * Log an error in the console and a channel in the developer server.
   * @param {Error} error The error to display
   */
  logError(error) {
    const errorMessage = `Uh! A${this.helper.vowels.includes(error.name[0].toLowerCase()) ? 'n' : ''} ${error.name}...\n${error.stack}`;
    console.error(errorMessage);
    if (!errorMessage.includes('Error status code')) return this.channels.cache.get('854697832979234826').send(errorMessage, { code: 'xl' });
  }

  /**
   * Log the sent messages.
   * @param {Message} message The sent message
   */
  logMessage(message) {
    const msg = message.content || '';
    const attachments = message.attachments.array();

    if (message.channel.type === 'dm') {
      const check = message.author === this.user;
      const user = check ? this.user : message.author;

      const embed = new MessageEmbed()
        .setColor(check ? '9ce9eb' : '000dde')
        .setTitle(check ? `Message envoyé à ${message.channel.recipient.username} :` : '')
        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
        .setDescription(msg)
        .setPotentialImage((attachments.length), attachments[0] != null ? attachments[0].url : '')
        .setFooter(check ? '' : message.author.id)

      return this.channels.cache.get('752075620636426260').send(embed);
    } else if (message.content && !message.channel.name.includes('logs')) return console.log(`[#${message.channel.name}] => [${message.member ? message.member.displayName : message.author.username}] : ${msg}`);
  }

  /**
   * Detect a specified member by ID, name or mention in a message.
   * @param {Message} message The message where to find the member
   * @param {Array|String} args Where to find the specified member potential
   * @returns {?GuildMember}
   */
  detectMember(message, args) {
    const arg = args instanceof Array ? args.join(' ') : args;

    let member = message.guild.members.cache.find(m => m.user.tag.toLowerCase() === arg.toLowerCase() || m.id === arg || [...arg].includes(m.id) || new RegExp(`<@!${m.id}>`).exec(arg) !== null || m.displayName.toLowerCase() === arg.toLowerCase() || m.user.username.toLowerCase() === arg.toLowerCase());
    if (!member && (!args.length || arg.length < 4)) return null;
    if (!member) member = message.guild.members.cache.find(m => m.user.username.toLowerCase().startsWith(arg.toLowerCase()) || m.user.username.toLowerCase().includes(arg.toLowerCase()) || m.user.username.toLowerCase().endsWith(arg.toLowerCase()) || m.displayName.toLowerCase().startsWith(arg.toLowerCase()) || m.displayName.toLowerCase().includes(arg.toLowerCase()) || m.displayName.toLowerCase().endsWith(arg.toLowerCase()));
    if (member) return member;
    else return null;
  }

  /**
   * Detect a specified role by ID, name or mention in a message.
   * @param {Message} message The message where to find the role
   * @param {Array|String} args Where to find the specified role potential
   * @returns {?Role}
   */
  detectRole(message, args) {
    const arg = args instanceof Array ? args.join(' ') : args;

    let role = message.guild.roles.cache.find(r => r.id === arg || [...arg].includes(r.id) || new RegExp(`<@&${r.id}>`).exec(arg) !== null || r.name.toLowerCase() === arg.toLowerCase());
    if (!role && (!args.length || arg.length < 4)) return null;
    if (!role) role = message.guild.roles.cache.find(r => r.name.toLowerCase().startsWith(arg.toLowerCase()) || r.name.toLowerCase().includes(arg.toLowerCase()) || r.name.toLowerCase().endsWith(arg.toLowerCase()));
    if (role) return role;
    else return null;
  }

  /**
   * Detect a specified user by ID, name or mention in a message.
   * @param {Message} message The message where to find the user
   * @param {Array|String} args Where to find the specified user potential
   * @returns {?User}
   */
  detectUser(message, args) {
    const arg = args instanceof Array ? args.join(' ') : args;

    let user = this.users.cache.find(u => u.tag.toLowerCase() === arg.toLowerCase() || u.id === arg || [...arg].includes(u.id) || new RegExp(`<@!?${u.id}>`).exec(arg) !== null || u.username.toLowerCase() === arg.toLowerCase());
    if (!user && (!args.length || arg.length < 4)) return null;
    if (!user) user = this.users.cache.find(u => u.username.toLowerCase().startsWith(arg.toLowerCase()) || u.username.toLowerCase().includes(arg.toLowerCase()) || u.username.toLowerCase().endsWith(arg.toLowerCase()));
    if (user) return user;
    else return null;
  }

  /**
   * Find a member by id in a guild.
   * @param {Message} message The guild where to find the member
   * @param {String} [id] The id of the member
   */
  memberByID(message, id) {
    const member = message.guild.members.cache.get(id || message.author.id);
    return member;
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
   * Edit parameters of a guild in the database.
   * @param {Guild} guild The guild to edit
   * @param {Object} settings The new value(s) for the guild
   */
  async updateGuild(guild, settings) {
    const data = await this.getGuild(guild);
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
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
   * Edit parameters of a member in the database.
   * @param {GuildMember} member The member to edit
   * @param {Guild} guild The guild where edit the member
   * @param {Object} settings The new value(s) for the member
   */
  async updateMember(member, guild, settings) {
    const data = await this.getMember(member, guild);
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  }

  /**
   * Edit an user's todo list in the database.
   * @param {User} user The user whose to edit todo list
   * @param {Object} settings The new value to add to the list
   */
  async updateTodo(user, settings) {
    const data = await this.getTodo(user);
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

  /**
   * Send the help page of a command.
   * @param {String} commandName The name of the command
   * @param {Message} message The sent message
   */
  async sendHelpPage(commandName, message) {
    const { commands } = this;

    const settings = await this.getGuild(message.guild);
    const prefix = settings.prefix;

    const command = commands.get(commandName) || commands.find(c => c.aliases && c.aliases.includes(commandName));

    if (!command) return message.inlineReply("<:unchecked:860839603098877953> • Cette commande n'existe pas.");

    const data = [];

    data.push(`__Catégorie__ : **${command.category}**\n\n__Usage__ ${command.name === 'help' ? '[:](https://cdn.discordapp.com/attachments/752433631255068742/862341002080681984/unknown.png)' : ':'}\`\`\`${prefix}${command.usage}\`\`\`\n__Utilité__ : ${command.description}`)
    if (command.aliases) data.push(`\n__Alias__ : \`${command.aliases.join('`, `')}\``);

    const embed = new MessageEmbed()
      .setColor(message.member.roles.highest.color || '')
      .setTitle(`Commande ${command.name} :`)
      .setDescription('*[] = arguments obligatoires ; <> = arguments facultatifs*\n\n' + data.join('\n'))
      .setThumbnail(command.img)

    if (command.and) embed.setFooter(command.and);
    if (command.andImg) embed.setImage(command.andImg);

    return message.channel.send(embed);
  }

  /**
   * Update bot status.
   */
  updateStatus() {
    const { statuses } = this.helper;
    const status = `${defaultSettings.prefix}help ─ ${statuses[this.getRandomInt(statuses.length)]}`;
    this.user.setPresence({ activity: { name: status, type: 'PLAYING' }, status: 'online' });
  }
}

module.exports = KyofuClient;

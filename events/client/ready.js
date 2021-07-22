const Client = require('../../struct/Client');

/**
 * The ready event, emitted when the bot is initialized.
 * @param {Client} client 
 */
module.exports = client => {
  setInterval(() => client.updateStatus(), 10000);
  
  console.log("[^^] Kyofu connectée !");
}

const { Intents } = require('discord.js');
const Client =  require('./struct/Client');
const client = new Client({
  ws: {
    intents: [Intents.ALL]
  }
});
require('./struct/Message.js');
require('./struct/User.js');
const { connect } = require('mongoose');
const { dbconnection, token } = require('./util/config.js');

connect(dbconnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('[^^] MongoDB connecté !');
}).catch(error => {
  client.logError(error);
});

client.loadCommands();
client.loadEvents();

process.on('uncaughtException', error => {
  client.logError(error);
});

process.on('unhandledRejection', error => {
  client.logError(error);
});

client.login(token);

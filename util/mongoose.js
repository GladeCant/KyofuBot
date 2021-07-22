const mongoose = require('mongoose');
const { dbconnection } = require('../config.json');

module.exports = {
  init() {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      autoIndex: false,
      poolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    mongoose.connect(dbconnection, options);
    mongoose.Promise = global.Promise;
    mongoose.connection.on('connected', () => console.log('[^^] MongoDB connecté !'))
  }
}

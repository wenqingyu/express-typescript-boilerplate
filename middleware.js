const mongoose = require('mongoose');
const config = require('./config.js');

module.exports = {
  mongodb: () => {
    console.log(config.mongodb);
    mongoose.connect(config.mongodb);
    mongoose.connection.on('error', () => {
      console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
      process.exit(1);
    });
  }
}

const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));
const Schema = mongoose.Schema;
const uuid = require('uuid');

const FlexepinSchema = new mongoose.Schema({
  payment_id: { type: String, index: {unique: true} },
  account: { type: String, default: '', unique: false },
  status: { type: String, default: 'PENDING', unique: false },
  // FUNDED, FUNDED, DECLINED
  amount: { type: Number, default: '', unique: false },
  currency: { type: String, default: 'USD', unique: false },
  description: { type: String, default: '', unique: false }
}, { timestamps: true });

const Flexepin = mongoose.model('Flexepin', FlexepinSchema);

module.exports = Flexepin;

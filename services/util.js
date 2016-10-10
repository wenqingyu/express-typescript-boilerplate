const express = require('express');
const Promise = require('bluebird');
const co = require('co');
const config = require(__dirname + '/../config.js');
const forEach = require('co-foreach-series');
const authentication = require(__dirname + '/../lib/authentication.js');
const keys = require(__dirname + '/../keys.json');
const BTCCSignedRequest = require('btcc-signed-request');
const rp = require('request-promise');


module.exports = {
  /**
  * Internal Funding Green Access
  *
  */
  fundingRequest: (account, gateway, amount, currency, payment_id) => {
    return co(function*() {
      // console.log('in funding request: ', account, gateway, amount, currency, payment_id);
      let source = [
        currency,
        amount,
        account,
        gateway,
        payment_id
      ];

      let hash = BTCCSignedRequest.getSignature(keys[gateway].secret, source.join(''));

      let data = {
        payment_id: payment_id,
        account: account,
        gateway: gateway,
        amount: amount,
        currency: currency,
        hash: hash
      }
      console.log('data: ', data);
      options = {
          method: 'POST',
          uri: config.paymentGateway.api.deposit,
          headers: {
            'Content-Type': 'application/json'
          },
          json: data
      }

      return yield rp(options)
      .then(function (response) {
          console.log('util response', response);
          return response;
      })
      .catch(function (err) {
          // POST failed...
          console.log('deposit error:', err);
          return response.error = err;

      });
    })
  }
}

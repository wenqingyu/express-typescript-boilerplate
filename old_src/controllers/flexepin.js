const express = require('express');
const request = require("es6-request");
const Promise = require('bluebird');
const co = require('co');
const BTCCSignedRequest = require('btcc-signed-request');
const config = require(__dirname + '/../config.js');
const authentication = require(__dirname + '/../lib/authentication.js');
const forEach = require('co-foreach-series');
const util = require(__dirname + '/../services/util.js');
const uuid = require('uuid');
const convert = require('object-array-converter');
const dateFormat = require('dateformat');
const Flexepin = require(__dirname + '/../models/flexepin.js');
const default_currency = 'USD';
const hmacsha256 = require('crypto-js/hmac-sha256');

module.exports = {


/* -------------- Adaptor Function ------------ */

  // Create Flexepin Payment
  createPayment: () => {
    return co(function*() {






      const eventURL = 'events';
      let eventList = yield request.get(config.simplex.api + eventURL)
      .header('Authorization', config.simplex.apiKey)
      .header('Content-Type', 'application/json')
      .then((body) => {
          let events = JSON.parse(body[0]);
          events = events.events;
          return events;
      })
      return eventList;
    })
  },





}


/* ----------------------------------------------------- */

function getRequest(url, payloads) {
  return co(function*() {
    let data = yield request.get(url)
    .header('Authorization', config.simplex.apiKey)
    .header('Content-Type', 'application/json')
    .send(JSON.stringify(payloads))
    .then((body) => {
        let result = JSON.parse(body);

        console.log(result);
        return result;
    })
    return data;
  })
}

function putRequest(url, payloads) {
  return co(function*() {
    let data = yield request.put(url)
    .header('Authorization', config.simplex.apiKey)
    .header('Content-Type', 'application/json')
    .send(JSON.stringify(payloads))
    .then((body) => {
        let result = JSON.parse(body);

        console.log(result);
        return result;
    })
    return data;
  })
}

function getHmacsha256(data){
  return hmacsha256(data, config.flexepin.secret);
}

function status(){
  return co(function*() {
    let result = yield getRequest(config.flexepin.api + "/status", null);
    console.log(result);
    return result;
  })
}

function voucherValidate(pin, terminalId, transId){
  return co(function*() {
    let result = yield getRequest(config.flexepin.api + "/voucher/validate/" + pin + "/" + terminalId + "/" + transId, null);
    console.log(result);
    return result;
  })
}
function voucherRedeem(pin, terminalId, transId){
  return co(function*() {
    let result = yield putRequest(config.flexepin.api + "/voucher/redeem/" + pin + "/" + terminalId + "/" + transId, null);
    console.log(result);
    return result;
  })
}
function transInfoTransNo(transNo, terminalId, queryTransNo){
  return co(function*() {
    let result = yield getRequest(config.flexepin.api + "/trans/trans_no/" + transNo + "/" + terminalId + "/" + queryTransNo, null);
    console.log(result);
    return result;
  })
}
function transInfoTransId(transId, terminalId, queryTransId){
  return co(function*() {
    let result = yield getRequest(config.flexepin.api + "/trans/trans_no/" + transNo + "/" + terminalId + "/" + queryTransId, null);
    console.log(result);
    return result;
  })
}
function storesCountry(country){
  return co(function*() {
    let result = yield getRequest(config.flexepin.api + "/stores/" + country, null);
    console.log(result);
    return result;
  })
}function storesLatLong(longi, lati, range){
  return co(function*() {
    let result = yield getRequest(config.flexepin.api + "/stores/" + longi + "/" + lati + "/" + range, null);
    console.log(result);
    return result;
  })
}function(){
  return co(function*() {

  })
}function(){
  return co(function*() {

  })
}

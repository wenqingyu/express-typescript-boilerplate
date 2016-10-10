const express = require('express');
const Promise = require('bluebird');
const co = require('co');
const config = require(__dirname + '/../config.js');
const jwt = require('jsonwebtoken');
const validator = require('validator');


module.exports = {
  /**
   * GET /*
   * Greeting page.
   */
  jwtVerify: (req, res, next) => {

    if(!req.headers['json-web-token']){
      return res.status(401).send({error: "Jwt not found", code: 401})
    }

    if(!req.params.account){
      return res.status(401).send({error: "User Account Missing", code: 401});
    }

    const token = req.headers['json-web-token'];
    try{
      let decoded = jwt.verify(token, config.jwtSecret);
      if(decoded.aud != req.params.account){
        return res.status(401).send({error: "Jwt is not belong to this account", code: 401});
      }
      return next(null, res, res);
    }catch(err) {
      return res.status(401).send({error: "Jwt Unauthorized", code: 401});
    }
  },

  email: {
    'email': {
      notEmpty: true,
      isEmail: {
        errorMessage: 'Invalid Email'
      }
    }
  }

}

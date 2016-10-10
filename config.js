module.exports = {

  jwtSecret: "_EkastayU2pEZ_q8g2k64eSwuSemE6he",

  mongodb: 'mongodb://172.20.7.219:27017/simplex_payment_gateway',

  // USED BY Adaptor Services: Simplex, Flexipin
  paymentGateway: {
    api: {
      deposit: 'https://exchange-staging.btcc.com/api/payment/v1/gateway/deposit'
    }
  },

  affiliate: {
    api: 'localhost:3010', // affiliate api
    gateway: 'affiliate'
  }

}

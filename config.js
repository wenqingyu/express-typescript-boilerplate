module.exports = {

  jwtSecret: "_EkastayU2pEZ_q8g2k64eSwuSemE6he",

  mongodb: 'mongodb://172.20.7.219:27017/simplex_payment_gateway',

  // USED BY Adaptor Services: Simplex, Flexipin
  paymentGateway: {
    api: {
      deposit: 'https://exchange-staging.btcc.com/api/payment/v1/gateway/deposit'
    }
  },

  // USED BY PAYMENT GATEWAY CENTER SERVER
  depositWithdraw: {
      api: 'http://172.20.3.213:8734/secure/RPC',
      signSecret: 'Btc_chin@_Future_exg_2015',

      operatorAccount: '88',
      operatorAccountKey: '18e803b2-202f-4e7e-94f7-06b0358ad88f'
  },

  // Adaptor's config
  simplex: {
    api: 'https://sandbox.test-simplexcc.com/v2/',
    // BTCC Test Key
    // api: 'https://api.Simplex.com/v2/',
    apiKey: 'ApiKey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXJ0bmVyIjoiYnRjYyIsInNhbmRib3giOnRydWV9.AnyTk5gwdvAaoDGLhFHzPX2Vyf3OoAzXNwHk-kUKHKE',
    // sandbox Key
    // apiKey: 'ApiKey eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXJ0bmVyIjoiZXhhbXBsZSIsInNhbmRib3giOnRydWV9.n6kOT1ATi7AfCLhhHHRew2zuEbvIU_64U17jrjVF1p0',
    partnerName: 'BTCC'

  },

  kyc: {
    api: 'https://staging.btcc.com/api.php/kyc',
    secret: '$1$v1Ry8P3A$AWMb69kS7U8KQz3QUOM00'
  },

  affiliate: {
    api: 'localhost:3010',
    gateway: 'affiliate'
  }


}

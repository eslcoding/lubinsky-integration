module.exports = {
  env: {
    name: 'staging',
    isProduction: false,
    isStaging: true,
    isDevelopment: false,
    domain: 'https://outaddin-dev.herokuapp.com'
  },
  dbURL: process.env.MONGODB_CLUSTER,
  monday: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    signingSercret: process.env.MONDAY_SIGNING_SECRET
  }
}

module.exports = {
  env: {
    name: 'production',
    isProduction: true,
    isStaging: false,
    isDevelopment: false,
    domain: 'https://monday-outlook.herokuapp.com'
  },
  dbURL: process.env.MONGODB_CLUSTER,
  monday: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    signingSercret: process.env.MONDAY_SIGNING_SECRET
  }
}

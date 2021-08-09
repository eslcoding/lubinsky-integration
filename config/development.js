module.exports = {
  env: {
    name: 'development',
    isProduction: false,
    isStaging: false,
    isDevelopment: true,
    domain: 'http://localhost:3030'
  },
  dbURL: process.env.MONGODB_CLUSTER,
  monday: {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    signingSercret: process.env.MONDAY_SIGNING_SECRET
  }
}

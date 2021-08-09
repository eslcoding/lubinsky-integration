var config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./production')
    break;
  case 'staging':
    config = require('./staging')
    break;
  default:
    config = require('./development')
    break;
}

module.exports = config
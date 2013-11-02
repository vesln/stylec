module.exports = process.env.STYLEC_COV
  ? require('./lib-cov/stylec')
  : require('./lib/stylec');

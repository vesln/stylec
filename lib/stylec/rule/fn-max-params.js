/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Max number of function params.
 */

var MaxParams = Rule.create({
  error: 'Too many function parameters',

  option: {
    key: 'fnparams',
    type: 'number'
  },

  on: {
    FunctionDeclaration: 'check',
    FunctionExpression: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

MaxParams.prototype.check = function(token) {
  if (token.params.length > this.option()) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = MaxParams;

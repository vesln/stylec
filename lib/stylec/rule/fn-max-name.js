/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Max length of function name.
 */

var MaxLen = Rule.create({
  error: 'The function name is too long',

  option: {
    key: 'fnmax',
    type: 'number'
  },

  on: {
    FunctionDeclaration: 'check',
    FunctionExpression: 'check',
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

MaxLen.prototype.check = function(token) {
  if (!token.id) return;

  if (token.id.name.length > this.option()) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = MaxLen;

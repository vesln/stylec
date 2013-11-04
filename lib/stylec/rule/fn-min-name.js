/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MinLen = Rule.create({
  error: 'The function name is too short',

  option: {
    key: 'fnmin',
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

MinLen.prototype.check = function(token) {
  if (!token.id) return;

  if (token.id.name.length < this.option()) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = MinLen;

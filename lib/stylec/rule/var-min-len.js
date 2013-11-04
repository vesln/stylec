/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MinLen = Rule.create({
  error: 'The variable name is too short',

  option: {
    key: 'varmin',
    type: 'number'
  },

  on: {
    VariableDeclaration: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

MinLen.prototype.check = function(tokens) {
  var min = this.option();

  tokens.declarations.forEach(function(token) {
    if (token.id.name.length < min) {
      this.badToken(token.id);
    }
  }, this);
};

/**
 * Primary export.
 */

module.exports = MinLen;

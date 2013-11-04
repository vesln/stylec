/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var MaxLen = Rule.create({
  error: 'The variable name is too long',

  option: {
    key: 'varmax',
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

MaxLen.prototype.check = function(tokens) {
  var max = this.option();

  tokens.declarations.forEach(function(token) {
    if (token.id.name.length > max) {
      this.badToken(token.id);
    }
  }, this);
};

/**
 * Primary export.
 */

module.exports = MaxLen;

/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Max length of variable identifier.
 */

var MaxLen = Rule.create({
  error: 'The variable name is too long',

  option: {
    type: 'number',
    key: 'varmax',
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

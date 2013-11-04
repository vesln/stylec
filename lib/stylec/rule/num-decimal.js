/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var NumDecimal = Rule.create({
  error: 'Prohibit usage of .n or n.',

  option: {
    key: 'numdec',
    type: 'boolean'
  },

  on: {
    Numeric: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

NumDecimal.prototype.check = function(token) {
  if (token.value[0] === '.' || token.value[token.value.length - 1] === '.') {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = NumDecimal;

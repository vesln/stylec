/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Prohibit "++" and "--".
 */

var IncrementDecrement = Rule.create({
  error: 'Prohibt usage of increment/decrement',

  option: {
    type: 'string',
    value: 'on',
    key: 'noincdec',
  },

  on: {
    'UpdateExpression': 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Source} source
 * @api public
 */

IncrementDecrement.prototype.check = function(token) {
  if (~['++', '--'].indexOf(token.operator)) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = IncrementDecrement;

/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var IncrementDecrement = Rule.create({
  error: 'Prohibt usage of increment/decrement',

  option: {
    key: 'noincdec',
    type: 'boolean'
  },

  on: {
    UpdateExpression: 'check'
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

/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Identifier case.
 */

var Quotes = Rule.create({
  error: 'Bad quotes',

  option: {
    key: 'quotes',
    type: 'enum',
    values: ['single', 'double'],
    defaults: 'single'
  },

  on: {
    'String': 'check'
  },
});

/**
 * Check case.
 *
 * @param {Object} token
 * @api public
 */

Quotes.prototype.check = function(token) {
  var style = this.option() === 'single' ? /^'(.*)'$/ : /^"(.*)"$/;
  if (style.test(token.value)) return;
  this.badToken(token);
};

/**
 * Primary export.
 */

module.exports = Quotes;

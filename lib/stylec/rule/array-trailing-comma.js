/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Array - Trailing Comma
 *
 * Check if an array has a trailing comma.
 *
 * ### prohibited
 *
 *     // Good
 *
 *     [1, 2, 3]
 *
 *     // Bad
 *
 *     [1, 2, 3,]
 *
 * ### required
 *
 *     // Good
 *
 *     [1, 2, 3,]
 *
 *     // Bad
 *
 *     [1, 2, 3]
 *
 * @key arrcomma
 * @type enum
 * @recommended prohibited
 * @values [required, prohibited]
 * @constructor
 */

var ArrayComma = Rule.create({
  error: 'Bad trailing array comma',

  option: {
    key: 'arrcomma',
    type: 'enum',
    values: ['required', 'prohibited']
  },

  on: {
    ArrayExpression: 'check',
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

ArrayComma.prototype.check = function(token) {
  var tokens = this.source.tokenRange(token.range);
  var comma = (tokens[tokens.length - 2] || {}).value === ',';
  var option = this.option();

  if (option === 'prohibited' && comma) {
    this.badToken(token);
  }

  if (option === 'required' && !comma && token.elements.length > 0) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = ArrayComma;

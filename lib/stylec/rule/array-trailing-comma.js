/**
 * Internal dependencies.
 */

var Rule = require('../rule');

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
  var hasComma = /,\s*]/.test(this.source.range(token.range));

  if (this.option() === 'prohibited' && hasComma) {
    this.badToken(token);
  }

  if (this.option() === 'required' && !hasComma) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = ArrayComma;

/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var Comma = Rule.create({
  error: 'Bad comma spacing',

  option: {
    key: 'commaspace',
    type: 'enum',
    values: ['after', 'before', 'surround']
  },

  on: {
    Punctuator: 'check',
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

Comma.prototype.check = function(token) {
  if (token.value !== ',') return;

  var range = [token.range[0] - 1, token.range[1] + 1];
  var str = this.source.range(range);
  var error = false;
  var test = function(char) {
    return /\s/.test(char);
  };

  switch (this.option()) {
    case 'after':
      if (!test(str[2]) || test(str[0])) error = true;
      break;
    case 'before':
      if (!test(str[0]) || test(str[2])) error = true;
      break;
    case 'surround':
      if (!test(str[0]) || !test(str[2])) error = true;
      break;
  }

  if (error) {
    this.badToken(token);
  }
};

/**
 * Primary export.
 */

module.exports = Comma;

/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Allowed blank lines rule.
 */

var BlankLines = Rule.create({
  error: 'More than allowed blank lines detected',

  option: {
    type: 'number',
    key: 'blanklines',
  },

  on: {
    'source': 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Source} source
 * @api public
 */

BlankLines.prototype.check = function(source) {
  source.eachLine(function(line, i) {
    if (!blank(line)) return;
    var prev = source.line(i - 1);

    if (typeof prev === 'string' && blank(prev)) {
      this.badLine(i);
    }
  }, this);
};

/**
 * Check if `str` is blank.
 *
 * @returns {Boolean}
 * @api private
 */

function blank(str) {
  return str.trim().length === 0;
}

/**
 * Primary export.
 */

module.exports = BlankLines;

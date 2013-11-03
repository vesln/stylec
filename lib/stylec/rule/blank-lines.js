/**
 * Internal dependencies.
 */

var Rule = require('../rule');
var blank = require('../util').blank;

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
    after: 'check'
  },
});

/**
 * Perform the check.
 *
 * @api public
 */

BlankLines.prototype.check = function() {
  this.source.eachLine(function(line, i) {
    if (!blank(line)) return;
    var prev = this.source.line(i - 1);

    if (typeof prev === 'string' && blank(prev)) {
      this.badLine(i);
    }
  }, this);
};

/**
 * Primary export.
 */

module.exports = BlankLines;

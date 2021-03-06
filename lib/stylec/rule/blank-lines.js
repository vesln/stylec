/**
 * Internal dependencies.
 */

var Rule = require('../rule');
var blank = require('../util').blank;

/**
 * Blank lines.
 *
 * Allowed number of sequential blank lines.
 *
 * @key blanklines
 * @type number
 * @recommended 1
 * @constructor
 */

var BlankLines = Rule.create({
  error: 'Bad number of sequential blank lines',

  option: {
    key: 'blanklines',
    type: 'number'
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

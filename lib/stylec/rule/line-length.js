/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Line length rule.
 */

var LineLength = Rule.create({
  error: 'Line too long',

  option: {
    key: 'line',
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

LineLength.prototype.check = function(source) {
  var maxLen = +this.option();

  source.eachLine(function(line, i) {
    if (line.length > maxLen) this.badLine(i);
  }, this);
};

/**
 * Primary export.
 */

module.exports = LineLength;

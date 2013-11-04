/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var LineLength = Rule.create({
  error: 'Line too long',

  option: {
    key: 'line',
    type: 'number'
  },

  on: {
    after: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Source} source
 * @api public
 */

LineLength.prototype.check = function() {
  var maxLen = this.option();

  this.source.eachLine(function(line, i) {
    if (line.length > maxLen) this.badLine(i);
  }, this);
};

/**
 * Primary export.
 */

module.exports = LineLength;

/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var TrailingWhitespace = Rule.create({
  error: 'Trailing whitespace detected',

  option: {
    key: 'twhite',
    type: 'boolean'
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

TrailingWhitespace.prototype.check = function(source) {
  this.source.eachLine(function(line, i) {
    if (line.length !== line.replace(/\s+$/,'').length) this.badLine(i);
  }, this);
};

/**
 * Primary export.
 */

module.exports = TrailingWhitespace;

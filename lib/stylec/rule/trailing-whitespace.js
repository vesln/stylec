/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Line length rule.
 */

var TrailingWhitespace = Rule.create({
  error: 'Trailing whitespace detected',

  option: {
    key: 'twhite',
    type: 'string',
    value: 'on',
    defaults: 'on'
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
  source.eachLine(function(line, i) {
    if (line.length !== line.replace(/\s+$/,'').length) this.badLine(i);
  }, this);
};

/**
 * Primary export.
 */

module.exports = TrailingWhitespace;

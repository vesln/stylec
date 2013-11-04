/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var SeqWhitespace = Rule.create({
  error: 'Bad number of sequential whitespace',

  option: {
    key: 'seqws',
    type: 'number'
  },

  on: {
    after: 'check'
  },
});

/**
 * Perform the check.
 *
 * @param {Object} token
 * @api public
 */

SeqWhitespace.prototype.check = function(token) {
  var num = this.option() + 1;
  var regexp = new RegExp('\\S\\s{' + num + '}');

  this.source.eachLine(function(line, i) {
    var matches = line.match(regexp);
    if (!matches) return;
    this.badLine(i);
  }, this);
};

/**
 * Primary export.
 */

module.exports = SeqWhitespace;

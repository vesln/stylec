/**
 * Internal dependencies.
 */

var Rule = require('../rule');

var Tabs = Rule.create({
  error: 'The line contains a tab',

  option: {
    key: 'notabs',
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

Tabs.prototype.check = function() {
  this.source.eachLine(function(line, i) {
    if (/\t/.test(line)) this.badLine(i);
  }, this);
};

/**
 * Primary export.
 */

module.exports = Tabs;

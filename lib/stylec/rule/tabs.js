/**
 * Internal dependencies.
 */

var Rule = require('../rule');

/**
 * Tabs rule.
 */

var Tabs = Rule.create({
  error: 'The line contains a tab',

  option: {
    key: 'notabs',
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

Tabs.prototype.check = function(source) {
  source.eachLine(function(line, i) {
    if (/\t/.test(line)) this.badLine(i);
  }, this);
};

/**
 * Primary export.
 */

module.exports = Tabs;

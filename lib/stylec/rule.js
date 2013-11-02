/**
 * Core dependencies.
 */

var util = require('util');

/**
 * Base rule.
 *
 * @param {Object} errors
 * @param {Object} options
 * @constructor
 */

function Rule(errors, options) {
  this.errors = errors;
  this.options = options;
  this.validateOption();
}

/**
 * Validate the primary option.
 *
 * @api private
 */

Rule.prototype.validateOption = function() {
  var val = this.option();
  var error = false;

  if (!val || val === 'off') {
    return;
  }

  switch (this._option.type) {
    case 'enum':
      error = this._option.values.indexOf(val) < 0;
      break;
    case 'number':
      error = isNaN(val);
      break;
    case 'string':
      error = val !== this._option.value;
      break;
  }

  if (error) {
    throw new Error('Invalid option – ' + val);
  }
};

/**
 * Subscribe to events.
 *
 * @api public
 */

Rule.prototype.subscribe = function(notifier) {
  if (this.disabled()) return;

  Object.keys(this.events).forEach(function(event) {
    notifier.on(event, this[this.events[event]].bind(this));
  }, this);
};

/**
 * Return if the rule is disabled.
 *
 * @returns {Boolean}
 * @api private
 */

Rule.prototype.disabled = function() {
  return this.option() === 'off';
};

/**
 * Return the primary option.
 *
 * @returns {Mixed}
 * @api private
 */

Rule.prototype.option = function() {
  return this.options[this._option.key];
};

/**
 * Add an error.
 *
 * @param {Object} error
 * @api private
 */

Rule.prototype.addError = function(err) {
  this.errors.push(err);
};

/**
 * Add an error from token.
 *
 * @param {Object} token
 * @api private
 */

Rule.prototype.badToken = function(token) {
  this.addError({
    line: token.loc.start.line,
    column: token.loc.start.column,
    message: this.errorMessage,
  });
};

/**
 * Add an error for line.
 *
 * @param {Number} line number
 * @api private
 */

Rule.prototype.badLine = function(num) {
  this.addError({
    line: num,
    column: 0,
    message: this.errorMessage,
  });
};

/**
 * Create a new rule.
 *
 * @param {String} option name
 * @returns {Rule}
 * @api public
 */

Rule.create = function(opts) {
  var rule = function() {
    Rule.apply(this, arguments);
  };
  util.inherits(rule, Rule);
  rule.prototype._option = opts.option;
  rule.prototype.events = opts.on || {};
  rule.prototype.errorMessage = opts.error;
  return rule;
};

/**
 * Primary export.
 */

module.exports = Rule;

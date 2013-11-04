/**
 * Core dependencies.
 */

var inherits = require('util').inherits;

/**
 * Base rule.
 *
 * @parma {Source} source
 * @constructor
 */

function Rule(source) {
  this.source = source;
  this.enabled = true;
  this.parseOptions();
}

/**
 * Validate the primary option.
 *
 * @api private
 */

Rule.prototype.parseOptions = function() {
  var val = this.source.option(this._option.key) || false;
  var error = false;

  if (val === false) {
    this.enabled = false;
    return;
  }

  switch (this._option.type) {
    case 'enum':
      error = this._option.values.indexOf(val) < 0;
      break;
    case 'number':
      val = +val;
      error = isNaN(val);
      break;
    case 'boolean':
      if (val === true || val === false) {
        break;
      }

      if (val === 'true') {
        val = true;
        break;
      }

      if (val === 'false') {
        val = false;
        break;
      }

      error = true;
      break;
    case 'string':
      error = val !== this._option.value;
      break;
  }

  this._opt = val;

  if (error) {
    throw new Error('Invalid option – ' + val);
  }
};

/**
 * Subscribe to events.
 *
 * @api public
 */

Rule.prototype.listen = function() {
  if (this.disabled()) return;

  Object.keys(this._events).forEach(function(event) {
    this.source.on(event, this[this._events[event]].bind(this));
  }, this);
};

/**
 * Return if the rule is disabled.
 *
 * @returns {Boolean}
 * @api private
 */

Rule.prototype.disabled = function() {
  return !this.enabled;
};

/**
 * Return the primary option.
 *
 * @api private
 */

Rule.prototype.option = function(val) {
  return this._opt;
};

/**
 * Add an error.
 *
 * @param {Object} error
 * @api private
 */

Rule.prototype.addError = function(err) {
  this.source.error(err);
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
    message: this._errorMessage,
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
    message: this._errorMessage,
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
  var self = this;
  var rule = function() {
    self.apply(this, arguments);
  };
  inherits(rule, Rule);
  rule.create = this.create;
  rule.prototype._option = opts.option;
  rule.prototype._events = opts.on || {};
  rule.prototype._errorMessage = opts.error;
  return rule;
};

/**
 * Primary export.
 */

module.exports = Rule;

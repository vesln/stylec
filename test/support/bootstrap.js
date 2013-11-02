/**
 * External dependencies.
 */

var chai = require('chai');

/**
 * Internal dependencies.
 */

var stylec = require('../..');

/**
 * Core dependencies.
 */

var join = require('path').join;

/**
 * Register `should`.
 */

global.should = chai.should();

/**
 * Include stack traces.
 */

chai.Assertion.includeStack = true;

/**
 * Stylec.
 */

global.stylec = stylec;

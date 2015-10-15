/*
 * consoleSubstitute
 * https://github.com/anseki/console-substitute
 *
 * Copyright (c) 2015 anseki
 * Licensed under the MIT license.
 */

;(function(global) {
'use strict';

function getMessage() {
  var args = Array.prototype.slice.call(arguments),
    message = args.shift() + '';
  if (!args.length) { return message; } // Don't replace
  message = message.replace(/%([odifs])/g, function(s, param) {
    // Formatting is not yet supported.
    var arg;
    if (!args.length) { return ''; }
    arg = args.shift();
    if (param === 'o') {
      return arg + '';
    } else if (param === 'd' || param === 'i') {
      arg = typeof arg === 'boolean' ? (arg ? 1 : 0) : parseInt(arg, 10);
      return isNaN(arg) ? '0' : arg + '';
    } else if (param === 'f') {
      arg = typeof arg === 'boolean' ? (arg ? 1 : 0) : parseFloat(arg);
      return isNaN(arg) ? '0.000000' : arg.toFixed(6) + '';
    } else if (param === 's') {
      return arg + '';
    }
  });
  if (message) { args.unshift(message); }
  return args.join(' ').replace(/\s*$/, ' '); // empty string is output as 'null'
}

var METHODS = [
    'log',
    'info',
    'error',
    'warn'
  ],
  isSupported = false;

if (!global.console) { return; }

global.console.info(
  'Test the console that supports the String Substitutions: %s',
  {toString: function() {
    isSupported = true;
    return 'OK';
  }}
);

if (!isSupported) { // Check again. Object.toString might not be called.
  (function() {
    var dtm = new Date();
    dtm.toString = function() {
      isSupported = true;
      return 'OK';
    };
    global.console.info('Check again: %s', dtm);
  })();
}

if (isSupported) { return; }

METHODS.forEach(function(method) {
  (function(nativeMethod) {
    global.console[method] = function() {
      nativeMethod.call(this, getMessage.apply(null, arguments));
    };
  })(global.console[method]);
});

global.console.info('Implementation of the String Substitutions: %s', 'DONE');

})(
/* jshint evil:true, newcap:false */
Function('return this')()
/* jshint evil:false, newcap:true */
);

/*jshint node:true, laxcomma:true */

// Replaces util.log(), removed in Node.js 23 (DEP0059).
function stdoutLog(msg) {
  console.log(new Date().toISOString() + ' - ' + msg);
}

var Logger = function (config) {
  this.config  = config;
  this.backend = this.config.backend || 'stdout';
  // The syslog backend depended on modern-syslog, a native addon that no longer builds on current Node.js.
  if (this.backend != 'stdout') {
    throw "Logger: backend '" + this.backend + "' is not supported, use 'stdout'.";
  }
};

Logger.prototype = {
  log: function (msg, type) {
    if (!type) {
      type = 'DEBUG';
    }
    stdoutLog(type + ": " + msg);
  }
};

exports.Logger = Logger;
exports.stdoutLog = stdoutLog;

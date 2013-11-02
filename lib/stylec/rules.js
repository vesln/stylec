var fs = require('fs');

module.exports = function(notifier, errors, options) {
  var dir = fs.readdirSync(__dirname + '/rule');

  dir.forEach(function(file) {
    if (file.charAt(0) === '.') return;
    var Rule = require(__dirname + '/rule/' + file);
    var rule = new Rule(errors, options);
    rule.subscribe(notifier);
  });
};

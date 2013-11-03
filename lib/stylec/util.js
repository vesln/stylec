exports.invalidCase = function(opt, val) {
  return opt === 'snake case'
    ? /[A-Z]/.test(val)
    : val.replace(/^_+|_+$/g, '').indexOf('_') > -1;
};

exports.blank = function(str) {
  return str.trim().length === 0;
};

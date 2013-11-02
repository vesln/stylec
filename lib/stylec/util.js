exports.invalidCase = function(opt, val) {
  return opt === 'snake case'
    ? /[A-Z]/.test(val)
    : val.replace(/^_+|_+$/g, '').indexOf('_') > -1;
};

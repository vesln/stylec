/* stylec unary: 1 */

var bad = !good;
var bad = !!good;
var bad = !/* bad */ good;

var good = ! ! good;
var good = ! good;
var good = ! /* ok */ good;

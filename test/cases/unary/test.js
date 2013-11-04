/* stylec unary: 1 */

var good = ! ! good;
var good = ! good;
var good = ! /* well this is ugly but valid */good;

var bad = !good; //! column: 10
var bad = !!good; //! column: 10, 11
var bad = !/* bad */ good; //! column: 10

var bad = ! //! column: 10
true;

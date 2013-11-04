/* stylec fnparams: 3 */

function foo(foo, bar, baz, boo) { //! column: 0
}

var foo = function(foo, bar, baz, boo) {}; //! column: 10

var foo = {
  foo: function(bar, baz, baz, boo) {} //! column: 7
};

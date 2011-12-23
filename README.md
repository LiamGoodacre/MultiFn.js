# MultiFn.js
MultiFn is a JavaScript utility which allows multiple implementations of a function based on different arguments.  i.e. if you want different code to run if a function is called with an Array as opposed to an Object.

MultiFn.js was authored by Liam Goodacre using Coffee-Script.

## Example
Check out the "[src/out]/test/" folders for example(s).

## Syntax
CoffeeScript:<pre>
myFn = new MultiFn {
  "Number Number": (_n1, _n2) -> myFn(_n1) + myFn(_n2)
  "Number":  (_num) -> _num
  "String": (_str) -> parseInt(_str, 10)
}
</pre>
JavaScript:<pre>
var myFn = new MultiFn({
  "Number Number": function (_n1, _n2) { return myFn(_n1) + myFn(_n2); },
  "Number": function (_num) { return _num; },
  "String": function (_str) { return parseInt(_str, 10); }
});
</pre>

## Defaults
MultiFn supports having a default implementation function, should none of the argument patterns match.  The syntax is as follows:

CoffeeScript:<pre>
someFn = new MultiFn {
  #...other functions...
  "default": ->
    # some default implementation
  #...other functions...
}
</pre>

JavaScript:<pre>
var someFn = new MultiFn({
  //...other functions...
  "default": function () {
    // some default implementation
  },
  //...other functions...
});
</pre>
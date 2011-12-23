# MultiFn.js
MultiFn is a JavaScript utility which allows multiple implementations of a function based on different arguments.  i.e. if you want different code to run if a function is called with an Array as opposed to an Object.

MultiFn.js was authored by Liam Goodacre using Coffee-Script.

## Example
Check out the "[src/out]/test/" folders for example(s).

## Syntax
CoffeeScript:<pre>
myFn = new MultiFn {
  "Number Number": (_args) -> myFn(_args[0]) + myFn(_args[1])
  "Number":  (_args) -> _args[0]
  "String": (_args) -> parseInt(_args[0], 10)
}
</pre>
JavaScript:<pre>
var myFn = new MultiFn({
  "Number Number": function (_args) { return myFn(_args[0]) + myFn(_args[1]); }
  "Number": function (_args) { return _args[0]; }
  "String": function (_args) { return parseInt(_args[0], 10); }
});
</pre>

## Defaults
MultiFn supports having a default implementation function, should none of the argument patterns match.  The syntax is as follows:

CoffeeScript:<pre>
someFn = new MultiFn {
  #...other functions...
  "default": (_args) ->
    # some default implementation
  #...other functions...
}
</pre>

JavaScript:<pre>
var someFn = new MultiFn({
  //...other functions...
  "default": function (_args) {
    // some default implementation
  },
  //...other functions...
});
</pre>
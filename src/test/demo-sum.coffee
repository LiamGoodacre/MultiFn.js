sum = new MultiFn {
  # Default to 0
  "default": -> 0
  
  # Return numbers
  "Number": (_val) -> _val
  
  # Convert strings to integers
  "String": (_str) -> parseInt(_str, 10)
  
  # Convert strings to integers
  "Boolean": (_bln) -> (_bln && 1) || 0
  
  # Recursively sum values for arrays
  "Array": (_arr) ->
    total = 0
    for value in _arr
      total += sum(value)
    return total
  
  # Recursively sum values for objects
  "Object": (_obj) ->
    total = 0
    for own key, value of _obj
      total += sum(value)
    return total
}

###
 * Tests
###
console.log(sum())                            # :-> 0
console.log(sum false)                        # :-> 0
console.log(sum true)                         # :-> 1
console.log(sum 42)                           # :-> 42
console.log(sum "13")                         # :-> 13
console.log(sum [ true, "2", 3, 4 ])          # :-> 10
console.log(sum { a: 1, b: 2, c: 3, d: 10 })  # :-> 16
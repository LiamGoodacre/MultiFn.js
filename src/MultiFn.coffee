###!
 * MultiFn.js JavaScript Utility v1.0.0
 * http://github.com/LiamGoodacre/MultiFn.js
 * 
 * Copyright 2011, Liam Goodacre
 * 
 * Author : Liam Goodacre
 * Author URL : http://liamgoodacre.com
 * GitHub : https://github.com/LiamGoodacre/MultiFn.js
 * Date : 2011_12_23
###
@MultiFn || @MultiFn = (->
  __toString = Object.prototype.toString
  $api =
    # Determins the type of a value
    Type: (_value) ->
      return __toString.call(_value).slice(8, -1)
    
    # Determines if a value is a function
    IsFunction: (_value) ->
      return $api.Type(_value) is "Function"
    
    # Builds a signature matching function
    Matcher: (_signature) ->
      dat = _signature.split /\s+/
      return (_args) ->
        if _args && _args.length is dat.length
          for item_type, index in dat
            if _args and $api.Type(_args[index]) isnt item_type
              return false
          return true
        return false
    
    # Builds individual functions for a MultiFn
    Fn: (signature, fn) ->
      matcher = new $api.Matcher signature
      return { signature, matcher, fn }
      
    # Constructor
    MultiFn: (_dat) ->
      # Instance's internal data
      data = []
      data_default = _dat["default"]
      data_default = (->) if not $api.IsFunction(data_default)
      
      # Fill with function data
      for key, value of _dat when key isnt "default"
        data.push $api.Fn(''+key, value)
      
      # MultiFn instance, execute the matching function
      result = -> result.lookup(arguments...)?([arguments...])
      # Looks up which function matches for some arguments
      result.lookup = -> $api.lookup result, data, data_default, arguments...
      # Adds a new function definition
      result.add = (signature, fn)->
        data.push $api.Fn(signature, fn)
      return result
      
    # Finds which function would execute for some arguments
    lookup: (_fn, _dat, _default, _args...) ->
      fn = _default
      for item in _dat when item.matcher(_args)
        fn = item.fn
        break
      return fn
  
  # Define User Interface
  $ui = (_dat) -> $api.MultiFn _dat
  
  # Expose the User Interface
  return $ui
)()
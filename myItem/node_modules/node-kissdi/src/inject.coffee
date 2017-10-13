deepcopy = require "deepcopy"
InjectCall = require "./call"
module.exports = (target, defaultValue) ->
  firstArgumentErr = new TypeError [
    "1st argument must be a list"
    "having a function as last element"
  ].join(" ")
  defaultValueError = new TypeError [
    "2nd argument must be an object having"
    "corresponding key and value"
  ].join(" ")

  if target not instanceof Array or
      typeof target[target.length - 1] isnt "function"
    throw firstArgumentErr

  if typeof defaultValue isnt "object" or
      defaultValue instanceof Array or not defaultValue
    throw defaultValueError

  params = deepcopy(target).splice(0, target.length - 1)
  for param in params
    if typeof param isnt "string"
      throw new TypeError "Target contains non-string param(s)"

    if param not in Object.keys(defaultValue)
      throw new TypeError "Unsatisfied Field: #{param}"

  for param of defaultValue
    if param not in params
      throw new TypeError "Unexpected Field: #{param}"

  new InjectCall params, target[target.length - 1], defaultValue

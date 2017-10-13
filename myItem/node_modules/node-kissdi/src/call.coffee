deepcopy = require "deepcopy"
class InjectCall
  constructor: (@params, @function, @defaultValues) ->
  "invoke": (factor) =>
    paramValues = (undefined for v in @params)
    for key, value of @defaultValues
      do (key, value) =>
        paramValues[@params.indexOf(key)] = value

    for key, value of factor
      do (key, value) =>
        paramValues[@params.indexOf(key)] = value

    @function.apply(@function, paramValues)

module.exports = InjectCall

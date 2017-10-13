expect = require("chai").expect
describe "Injector function call tests", ->
  InjectCall = require("../../src/call")
  injectObj = null

  beforeEach -> injectObj = new InjectCall(
    [
      "test",
      "test2"
    ],
    ((t1, t2) -> [t1, t2]),
    "test": "Hello",
    "test2": "World"
  )
  afterEach -> injectObj = null

  describe "Calling injectCall as it is", ->
    it "Should be Hello World", ->
      result = injectObj.invoke()
      expect(result).eql ["Hello", "World"]

  describe "Calling injectCall with injection factor", ->
    factor = undefined
    beforeEach ->
      factor =
        "test": "Helo"
        "test2": "Konichiwa"
    it "Should be Helo Konichiwa", ->
      expect(injectObj.invoke factor).eql ["Helo", "Konichiwa"]

    describe "If the factor lacks something...", ->
      beforeEach ->
        delete factor.test
      it "Should be Hello Konichiwa", ->
        expect(injectObj.invoke factor).eql ["Hello", "Konichiwa"]

    describe "If the factor has an extra element", ->
      it "Shouldn't throw any errors", ->
        expect(-> injectObj.invoke factor).not.throw Error
      it "Should be Helo Konichiwa", ->
        expect(injectObj.invoke factor).eql ["Helo", "Konichiwa"]

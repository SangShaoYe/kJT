expect = require("chai").expect
mkfunc = require "../../src/inject.coffee"

describe "mkfunc tests", ->
  describe "Invalid argument", ->
    describe "For target", ->
      errMsg = "1st argument must be a list having a function as last element"
      secArg = "test": "test"
      describe "String case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc "test", secArg
          ).throw TypeError, errMsg
      describe "Number case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc 12345.01, secArg
          ).throw TypeError, errMsg
      describe "Object case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc "test": "test", secArg
          ).throw TypeError, errMsg
      describe "Undefined case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc undefined, secArg
          ).throw TypeError, errMsg
      describe "Null case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc null, secArg
          ).throw TypeError, errMsg
      describe "true case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc true, secArg
          ).throw TypeError, errMsg
      describe "false case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc false, secArg
          ).throw TypeError, errMsg
      describe "Array case, but not function at last", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc ["test", "test"], secArg
          ).throw TypeError, errMsg
      describe "Array, case, but it has non-string values", ->
        errMsg2 = "Target contains non-string param(s)"
        describe "Undefined case", ->
          expect(->
            mkfunc [
              undefined
              "test2"
              (t, t2) -> [t, t2]
            ], secArg
          ).throw TypeError, errMsg2
        describe "null case", ->
          expect(->
            mkfunc [
              "test"
              null
              (t, t2) -> [t, t2]
            ], secArg
          ).throw TypeError, errMsg2
        describe "true case", ->
          expect(->
            mkfunc [
              "test"
              true
              (t, t2) -> [t, t2]
            ], secArg
          ).throw TypeError, errMsg2
        describe "false case", ->
          expect(->
            mkfunc [
              false
              "test2"
              (t, t2) -> [t, t2]
            ], secArg
          ).throw TypeError, errMsg2
        describe "Number case", ->
          it "Should throw TypeError", ->
            expect(->
              mkfunc [
                "test"
                2
                (t, t2) -> [t, t2]
              ], secArg
            ).throw TypeError, errMsg2
        describe "List case", ->
          it "Should throw TypeError", ->
            expect(->
              mkfunc [
                "test"
                ["test", "test"]
                (t, t2) -> [t, t2]
              ], secArg
            ).throw TypeError, errMsg2
        describe "Object case", ->
          it "Should throw TypeError", ->
            expect(->
              mkfunc [
                "test"
                ("test": "test")
                (t, t2) -> [t, t2]
              ], secArg
            ).throw TypeError, errMsg2
        describe "Function case", ->
          it "Should throw TypeError", ->
            expect(->
              mkfunc [
                "test"
                (t, t2)-> [t, t2]
                (t, t2) -> [t, t2]
              ], secArg
            ).throw TypeError, errMsg2

    describe "For default values", ->
      firstArg = [
        "test"
        "test2"
        (t, t2) -> [t, t2]
      ]
      errMsg = [
        "2nd argument must be an object having"
        "corresponding key and value"
      ].join(" ")
      describe "String case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg, "test"
          ).throw TypeError, errMsg
      describe "Number case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg, 12345.01
          ).throw TypeError, errMsg

      describe "List case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg, ["This", "is", "a", "test"]
          ).throw TypeError, errMsg
      describe "Function case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg, (t) -> t
          ).throw TypeError, errMsg
      describe "Undefined case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg, undefined
          ).throw TypeError, errMsg
      describe "Null case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg, null
          ).throw TypeError, errMsg
      describe "false case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg, false
          ).throw TypeError, errMsg
      describe "true case", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg, true
          ).throw TypeError, errMsg

      describe "Object case, unsatisfied field", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg,
              "test": "test"
          ).throw TypeError, "Unsatisfied Field: test2"

      describe "Object case, unexpected field", ->
        it "Should throw TypeError", ->
          expect(->
            mkfunc firstArg,
              "test": "test"
              "test2": "test2"
              "test3": "test3"
          ).throw TypeError, "Unexpected Field: test3"

  describe "Valid Argument", ->
    InjectCall = require "../../src/call"
    it "Returns InjectCall Object", ->
      result = mkfunc [
        "test",
        "test2",
        (t1, t2) -> [t1, t2]
      ], {
        "test": "hello",
        "test2": "world"
      }
      expect(result).instanceOf InjectCall

expect = require("chai").expect
sinon = require "sinon"
through2 = require "through2"
path = require "path"
extend = require "extend"
gutil = require "gulp-util"

describe "SCSS unit test", ->
  objectToInject = undefined
  scss = undefined
  file = undefined
  fs = undefined
  func_scss = undefined
  cb = undefined
  ioMap = undefined

  beforeEach ->
    delete process.env.testing
    delete require.cache[require.resolve "../src/scss.coffee"]
    process.env.testing = true
    scss = require "../src/scss.coffee"

    dest = sinon.spy()
    cb = sinon.spy()

    file =
      "clone": sinon.stub().returns extend true, file
      "isNull": sinon.stub().returns false
      "isBuffer": sinon.stub().returns true
      "isStream": sinon.stub().returns false
      "pipe": sinon.spy()
      "path": path.join path.sep, "tests", "data", "source.scss"
      "cwd": path.sep
      "base": path.join path.sep, "tests", "data"
      "contents": new Buffer("Hello World")
      "relative": "source.scss"

    objectToInject =
      "exec": sinon.stub().returns "on": (event, callback) ->
        if event is "close"
          callback 0
      "fs":
        "createWriteStream": sinon.stub().returns(
          "on": (event, callback) ->
            if event is "finish"
              callback()
        )
        "readFile": (path, options, cb) ->
          if typeof options is "function"
            return options undefined, file.contents
          return cb undefined, file.contents
      "mkdirp": sinon.stub().callsArg 1
    func_scss = scss.__compile__.invoke objectToInject

  describe "Null File", ->
    beforeEach ->
      file.isNull = sinon.stub().returns(true)
      file.isBuffer = sinon.stub().returns(false)
    it "cb should be called", ->
      func_scss()(file, undefined, cb)
      expect(cb.calledWith null, file).is.ok

  describe "Non Null File", ->
    beforeEach ->
      file.isNull = sinon.stub().returns(false)
    it "cb should returns as it is", (done) ->
      func_scss()(file, undefined, cb).then(
        ->
          expect(cb.calledWith null, file).is.ok
      ).done (-> done()), done

  describe "When options are passed", ->
    describe "When bundleExec is true", ->
      func_promise = undefined
      beforeEach (done) ->
        func_promise = func_scss(
          "bundleExec": true
        )(file, undefined, -> done())

      it "exec function should be called with bundle exec scss", (done) ->
        func_promise.then(
          ->
            expect(
              objectToInject.exec.calledWithExactly "bundle", [
                "exec"
                "scss"
                "--sourcemap=auto"
                gutil.replaceExtension file.path, ".scss"
                path.join(
                  file.cwd,
                  ".gulp-scss-cache",
                  path.relative(file.cwd, file.base),
                  "source.css"
                )
              ], ("stdio": "inherit", "shell": true)
            ).is.true
            done()
        ).catch done

      it("file path should be replaced with .gulp-scss-cache/source.css",
          (done) ->
            func_promise.then(
              -> expect(file.path).equal(
                path.join path.sep + "tests", "data", "source.css"
              )
            ).done (-> done()), done
        )

    describe "When bundleExec is false", ->
      func_promise = undefined
      beforeEach (done) ->
        func_promise = func_scss(
          "bundleExec": false
        )(file, undefined, (-> done()))

      it "exec function should be called with scss", (done) ->
        func_promise.then(
          ->
            expect(
              objectToInject.exec.calledWithExactly "scss", [
                "--sourcemap=auto"
                gutil.replaceExtension file.path, ".scss"
                path.join(
                  file.cwd,
                  ".gulp-scss-cache",
                  path.relative(file.cwd, file.base),
                  "source.css"
                )
              ], ("stdio": "inherit", "shell": true)
            ).is.true
        ).done (-> done()), done

      it "Path should have css extension", ->
        expect(file.path).is.equal(
          path.join path.sep + "tests", "data", "source.css"
        )

    describe "When path is specified", ->
      func_promise = undefined
      beforeEach (done) ->
        func_promise = func_scss(
          "tmpPath": "test"
        )(file, undefined, (-> done()))

      it "Dir named \"test\" should be created", (done) ->
        func_promise.then(
          -> expect(objectToInject.mkdirp.calledWith path.join(
            file.cwd,
            "test",
            path.relative(file.cwd, file.base)
          )).is.ok
        ).done (-> done()), done

    describe "When sourcemap has special options", ->
      for smvalue in ["auto", "file", "inline", "none"]
        do (smvalue) ->
          describe "Case: #{smvalue}", ->
            func_promise = undefined
            beforeEach (done)->
              func_promise = func_scss(
                "sourcemap": smvalue
              )(file, undefined, (-> done()))
            it "exec function should be called with sourcemap", (done) ->
              func_promise.then(
                -> expect(objectToInject.exec.calledWithExactly "scss", [
                    "--sourcemap=#{smvalue}"
                    gutil.replaceExtension file.path, ".scss"
                    path.join(
                      file.cwd,
                      ".gulp-scss-cache",
                      path.relative(file.cwd, file.base),
                      "source.css"
                    )
                  ], ("stdio": "inherit", "shell": true)).is.true
              ).done (-> done()), done

  describe "Without any options", ->
    func_promise = undefined
    beforeEach (done) ->
      func_promise = func_scss()(file, undefined, (-> done()))

    it "exec function should be called with scss", (done) ->
      func_promise.then(
        ->
          expect(
            objectToInject.exec.calledWithExactly "scss", [
              "--sourcemap=auto"
              gutil.replaceExtension file.path, ".scss"
              path.join(
                file.cwd,
                ".gulp-scss-cache",
                path.relative(file.cwd, file.base),
                "source.css"
              )
            ], ("stdio": "inherit", "shell": true)
          ).is.ok
      ).done (-> done()), done

    it "Path should have css extension", ->
      expect(file.path).is.equal(
        path.join path.sep + "tests", "data", "source.css"
      )


describe "For non-testing mode", ->
  after ->
    delete require.cache[require.resolve "../src/scss.coffee"]
  it "The plugin should be a function", ->
    expect(require "../src/scss.coffee").is.a "function"

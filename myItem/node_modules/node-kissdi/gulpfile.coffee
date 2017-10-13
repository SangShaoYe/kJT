g = require "gulp"
mocha = require "gulp-mocha"
notify = require "gulp-notify"
coffeelint = require "gulp-coffeelint"
plumber = require "gulp-plumber"
coffee = require "gulp-coffee"

g.task "test", ->
  g.src(
    "./tests/specs/**/*.coffee"
  ).pipe(
    plumber errorHandler: notify.onError "<%= error.message %>"
  ).pipe(
    coffeelint("./coffeelint.json")
  ).pipe(
    coffeelint.reporter()
  ).pipe(
    coffeelint.reporter "failOnWarning"
  ).pipe(
    mocha "reporter": "dot"
  )

g.task "gulpfile-syntax", ->
  g.src("./gulpfile.coffee").pipe(
    plumber errorHandler: notify.onError "<%= error.message %>"
  ).pipe(
    coffeelint("./coffeelint.json")
  ).pipe(
    coffeelint.reporter()
  ).pipe(
    coffeelint.reporter "failOnWarning"
  )

g.task "compile", ["test"], ->
  g.src(
    "./src/**/*.coffee"
  ).pipe(
    plumber errorHandler: notify.onError "<%= error.message %>"
  ).pipe(
    coffee()
  ).pipe(g.dest("./lib"))

g.task "default", ->
  g.watch ["./tests/specs/**/*.coffee", "./src/**/*.coffee"], ["compile"]
  g.watch "./gulpfile.coffee", ["gulpfile-syntax"]

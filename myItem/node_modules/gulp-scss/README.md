# Gulp Plugin for SCSS compiler by standard approach

OS X/Linux: [![Build Status](https://travis-ci.org/Forumouth/gulp-scss.svg?branch=master)](https://travis-ci.org/Forumouth/gulp-scss)
Windows: [![Build status](https://ci.appveyor.com/api/projects/status/t756bxbt0nr4ekid/branch/master?svg=true)](https://ci.appveyor.com/project/hiroaki-yamamoto/gulp-scss/branch/master)

[![NPM](https://nodei.co/npm/gulp-scss.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-scss/)

## Note this script is obsolete
According to [libsass](http://sass-compatibility.github.io/), libsass has now the
same feature of ruby sass. Therefore, I think there is no reason to use my buggy plugin.

## What this?
This is a plugin for SCSS (aka. SASS) compiler by standard approach

## Why you re-invent?
* ~~I found [gulp-sass](https://github.com/dlmanning/gulp-sass), but it doesn't
  seem to support actual sass, because the backend, [node-sass](https://github.com/sass/node-sass) is a port of libsass that has major limitations.~~ it seems to have the same function of ruby sass now and I recommend to use it.
* Then, I found [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass),
  but there are some major limitations of use (e.g. you can't use file globbing)

## How can I use?
It's also just simple

`gulpfile.js`

```JavaScript
/*global require*/
(function (r) {
    "use strict";
    var scss = r("gulp-scss");
    var gulp = r("gulp");
    gulp.task("scss", function () {
        gulp.src(
            "home/scss/**/*.scss"
        ).pipe(scss(
            {"bundleExec": true}
        )).pipe(gulp.dest("home/static/css"));
    });
}(require));
```

## Options
You can specify options by passing it as a parameter object of `scss` function,
as you can see above. In particular, `scss` function has a parameter named options:
`scss(options)`

When options are falsy, normal options are used.

### Note
As of 1.2.0, options are passed to scss thru
[dargs](https://github.com/sindresorhus/dargs).
Therefore, all options except the following will be passed to scss directly:

#### options.bundleExec (boolean, default: false)
When this option is true, `bundle exec scss` is used instead of `scss`. Otherwise,
`scss` is used instead of `bundle exec scss`

#### options.tmpPath (string, default: `.gulp-scss-cache`)
Specifies temporary path to store the compiled files.
Note that you should specify the path as relative path

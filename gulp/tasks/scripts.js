var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var handleErrors = require('../util/handleErrors');


gulp.task('scripts', function () {
  var bundler = watchify(browserify('./app/scripts/app.js', watchify.args));

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      .on('error', handleErrors)
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/scripts'));
  }

  return rebundle();
});

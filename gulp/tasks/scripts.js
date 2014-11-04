var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var unpathify = require('unpathify');
var livereload = require('gulp-livereload');
var handleErrors = require('../util/handleErrors');


gulp.task('scripts', function () {
  var bundler = watchify(browserify('./app/scripts/app.js', {
    cache: {},
    packageCache: {},
    fullPaths: true,
  }));

  // Ignore moment from Pikaday
  bundler.ignore('moment');
  bundler.transform({global: true}, 'uglifyify');

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler
      .bundle()
      .pipe(source('app.js'))
      .on('error', handleErrors)
      .pipe(gulp.dest('dist/scripts'))
      .pipe(livereload());
  }

  return rebundle();
});

var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var livereload = require('gulp-livereload');
var handleErrors = require('../util/handleErrors');


gulp.task('scripts', function () {
  // TODO: remove watchify args from final build
  var bundler = watchify(browserify('./app/scripts/app.js', watchify.args));

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

var gulp = require('gulp');
var jade = require('gulp-jade');


gulp.task('jade', ['rimraf'], function () {
  return gulp.src('app/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'));
});


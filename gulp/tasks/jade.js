var gulp = require('gulp');
var jade = require('gulp-jade');
var connect = require('gulp-connect');


gulp.task('jade', function () {
  return gulp.src('app/index.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});


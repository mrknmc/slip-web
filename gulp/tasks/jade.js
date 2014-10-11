var gulp = require('gulp');
var connect = require('gulp-connect');


gulp.task('jade', function () {
  return gulp.src('app/views/**/*.jade')
    .pipe(gulp.dest('dist/views'))
		.pipe(connect.reload());
});


var gulp = require('gulp');
var livereload = require('gulp-livereload');


gulp.task('jade', function () {
  return gulp.src('app/views/**/*.jade')
    .pipe(gulp.dest('dist/views'))
		.pipe(livereload());
});


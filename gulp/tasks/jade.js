var gulp = require('gulp');
var jade = require('gulp-jade');


gulp.task('jade', function () {
  return gulp.src(['app/**/*.jade'])
    .pipe(gulp.dest('dist'));
})

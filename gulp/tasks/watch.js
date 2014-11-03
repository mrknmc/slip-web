var gulp = require('gulp');
var livereload = require('gulp-livereload');


gulp.task('watch', ['build'], function () {
  livereload.listen();
  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/**/*.jade', ['jade']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/images/**/*', ['images']);
});

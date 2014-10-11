var gulp = require('gulp');


gulp.task('build', ['rimraf'], function() {
  gulp.start('styles');
  gulp.start('scripts');
  gulp.start('images');
  gulp.start('jade');
});

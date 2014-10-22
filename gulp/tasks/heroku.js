var gulp = require('gulp');


gulp.task('heroku:production', ['rimraf'], function() {
  gulp.start('styles');
  gulp.start('scripts');
  gulp.start('images');
  gulp.start('jade');
});

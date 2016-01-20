gulp = require('gulp')

gulp.task 'test', () ->
  mocha = require('gulp-mocha')
  gulp.src('test/**/*_spec.js')
    .pipe mocha(
      ui:       'bdd',
      reporter: 'spec',
    )

gulp.task 'watch', () ->
  gulp.watch(['test/**/*'], ['test'])

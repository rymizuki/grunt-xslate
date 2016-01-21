gulp = require('gulp')

gulp.task 'grunt', (done) ->
  exec = require('child_process').exec
  exec('./node_modules/.bin/grunt --gruntfile ./test/Gruntfile.js xslate', done)

gulp.task 'test', ['grunt'], () ->
  mocha = require('gulp-mocha')
  gulp.src('test/**/*_spec.js')
    .pipe mocha(
      ui:       'bdd',
      reporter: 'spec',
    )

gulp.task 'watch', () ->
  gulp.watch(['test/**/*'], ['test'])

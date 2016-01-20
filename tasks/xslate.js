var which  = require('which'),
    Xslate = require('../lib/xslate')

module.exports = function (grunt) {
  grunt.registerMultiTask('xslate', 'build templates from Text::Xslate', function () {
    var options = this.options({
      cartonExec: false,
      syntax:     'Kolon',
      data:       null,
      runner:     null,
    })

    // ensure runner.
    try {
      grunt.file.isFile(runner) || which.sync(runner)
    } catch (err) {
      var message = "You need to have Text::Xslate installed and in your PATH for this task to work.\n"+
                    "`cpanm Text::Xslate` or `echo \"requires 'Text::Xslate';\" > cpanfile; carton install\n`"
      return grunt.fatal(message)
    }

    var xslate = new Xslate({
      cartonExec: options.cartonExec,
      syntax:     options.syntax,
      runner:     options.runner,
    })
    var data = options.data

    // execute xslate
    var promises = _.reduce(this.files, function (prev, file) {
      _.each(file.src, function (filepath) {
        var promise = xslate.exec(filepath, data).then(function (content) {
          grunt.file.write(file.dest, content)
        }).catch(function (rejection) {
          return rejection
        })
        prev.push(promise)
      })
    }, [])

    return Q.all(promises)
      .fail(function (rejection) { grunt.fatal(rejection) })
      .done(this.async())
  })
}

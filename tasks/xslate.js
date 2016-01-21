var which  = require('which'),
    _      = require('lodash'),
    Q      = require('q'),
    Xslate = require('../lib/xslate').Xslate

module.exports = function (grunt) {
  grunt.registerMultiTask('xslate', 'build templates from Text::Xslate', function () {
    var options = this.options({
      cartonExec: false,
      syntax:     'Kolon',
      data:       null,
      runner:     'xslate',
    })

    // ensure runner.
    try {
      grunt.file.isFile(options.runner) || which.sync(options.runner)
    } catch (err) {
      throw new Error(err)
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
          console.log(content)
          grunt.file.write(file.dest, content)
        }).catch(function (rejection) {
          throw new Error(rejection)
        })
        prev.push(promise)
      })
      return prev
    }, [])

    return Q.all(promises)
      .fail(function (rejection) { grunt.fatal(rejection) })
      .done(this.async())
  })
}

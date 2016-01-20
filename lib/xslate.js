var exec  = require('child_process').exec,
    Q     = require('q'),
    _     = require('lodash')

function Xslate (options) {
  this.options = _.defaults(options, {
    cartonExec: false,
    syntax:     'Kolon',
    runner:     'xslate'
  })
}

Xslate.prototype.createCommand = function (filepath, data) {
  var cmd = [this.options.runner]

  // carton exec runner
  if (this.options.cartonExec) {
    cmd.unshift('exec')
    cmd.unshift('carton')
  }

  // --syntax
  if (this.options.syntax) {
    cmd.push('--syntax='+this.options.syntax)
  }

  // --define
  _.each(data || {}, function (value, name) {
    cmd.push('--define "'+name+'='+value+'"')
  })

  // filepath
  cmd.push(filepath)

  return cmd.join(' ')
}

Xslate.prototype.exec = function (filepath, data) {
  var command = this.createCommand(filepath, data)

  return Q.Promise(function (resolve, reject) {
    exec(command, function (err, stdout, stderr) {
      if (err || stderr) {
        reject(err || stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}

module.exports = function (filepath, data, options, fn) {
  var promise = new Xslate(options).exec(filepath, data)
  if (fn) {
    promise
      .then(function (content) {
        fn(null, content)
      })
      .catch(function (rejection) {
        fn(rejection, null)
      })
  }
  return promise
}

module.exports.Xslate = Xslate

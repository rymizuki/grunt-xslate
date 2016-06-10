var exec  = require('child_process').exec,
    Q     = require('q'),
    _     = require('lodash')

function Xslate (options) {
  this.options = _.defaults(options, {
    cartonExec: false,
    syntax:     'Kolon',
    runner:     'xslate',
    path:        null,
  })
  this.formatter = null
}

Xslate.prototype.setFormatter = function (formatter) {
  if (!_.isFunction(formatter)) {
    throw new Error('"formatter" must be function')
  }
  this.formatter = formatter
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

  // --path
  if (this.options.path) {
    cmd.push('--path=\''+this.options.path+'\'')
  }

  // --define
  var formatter = this.formatter || function (value) { return value }
  _.each(data || {}, function (value, name) {
    cmd.push('--define \''+name+'='+formatter(value, name)+'\'')
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
        if (err)    return reject(err)
        if (stderr) return reject(stderr)
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

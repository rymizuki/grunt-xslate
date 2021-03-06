var assert = require('power-assert')
var path   = require('path'),
    fs     = require('fs')

var xslate = require('../../lib/xslate')

describe('xslate', function () {
  describe('.Xslate', function () {
    describe('new Xslate()', function () {
      beforeEach(function () {
        this.xslate = new xslate.Xslate()
      })
      describe('xslate.options', function () {
        it('should be {syntax: "Kolon", cartonExec: false, runner: "xslate"}', function () {
          assert.deepEqual(this.xslate.options, {
            cartonExec: false,
            syntax: "Kolon",
            runner: "xslate",
            path:   null,
          })
        })
      })
      describe('xslate.createCommand("path/to.tx")', function () {
        it('should be `xslate --syntax=Kolon path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx'),
            'xslate --syntax=Kolon path/to.tx'
          )
        })
      })
      describe('xslate.createCommand("path/to.tx", {name: "hoge"})', function () {
        it('should be `xslate --syntax=Kolon --define \'name=hoge\' path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'xslate --syntax=Kolon --define \'name=hoge\' path/to.tx'
            )
        })
      })
    })
    describe('new Xslate({cartonExec: true})', function () {
      beforeEach(function () {
        this.xslate = new xslate.Xslate({cartonExec: true})
      })
      describe('xslate.options', function () {
        it('should be {syntax: "Kolon", cartonExec: true, runner: "xslate"}', function () {
          assert.deepEqual(this.xslate.options, {
            cartonExec: true,
            syntax: "Kolon",
            runner: "xslate",
            path:   null,
          })
        })
      })
      describe('xslate.createCommand("path/to.tx")', function () {
        it('should be `carton exec xslate --syntax=Kolon path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx'),
            'carton exec xslate --syntax=Kolon path/to.tx'
          )
        })
      })
      describe('xslate.createCommand("path/to.tx", {name: "hoge"})', function () {
        it('should be `carton exec xslate --syntax=Kolon --define \'name=hoge\' path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'carton exec xslate --syntax=Kolon --define \'name=hoge\' path/to.tx'
            )
        })
      })
    })

    describe('new Xslate({syntax: "TTerse"})', function () {
      beforeEach(function () {
        this.xslate = new xslate.Xslate({syntax: 'TTerse'})
      })
      describe('xslate.options', function () {
        it('should be {syntax: "TTerse", cartonExec: false, runner: "xslate"}', function () {
          assert.deepEqual(this.xslate.options, {
            cartonExec: false,
            syntax: "TTerse",
            runner: "xslate",
            path: null,
          })
        })
      })
      describe('xslate.createCommand("path/to.tx")', function () {
        it('should be `xslate --syntax=TTerse path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx'),
            'xslate --syntax=TTerse path/to.tx'
          )
        })
      })
      describe('xslate.createCommand("path/to.tx", {name: "hoge"})', function () {
        it('should be `xslate --syntax=TTerse --define \'name=hoge\' path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'xslate --syntax=TTerse --define \'name=hoge\' path/to.tx'
            )
        })
      })
    })
    describe('new Xslate({syntax: "Kolon"})', function () {
      beforeEach(function () {
        this.xslate = new xslate.Xslate({syntax: 'Kolon'})
      })
      describe('xslate.options', function () {
        it('should be {syntax: "Kolon", cartonExec: false, runner: "xslate"}', function () {
          assert.deepEqual(this.xslate.options, {
            cartonExec: false,
            syntax: "Kolon",
            runner: "xslate",
            path:   null,
          })
        })
      })
      describe('xslate.createCommand("path/to.tx")', function () {
        it('should be `xslate --syntax=TTerse path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx'),
            'xslate --syntax=Kolon path/to.tx'
          )
        })
      })
      describe('xslate.createCommand("path/to.tx", {name: "hoge"})', function () {
        it('should be `xslate --syntax=Kolon --define \'name=hoge\' path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'xslate --syntax=Kolon --define \'name=hoge\' path/to.tx'
            )
        })
      })
    })
    describe('new Xslate({runner: "./stuff/runner.pl"})', function () {
      beforeEach(function () {
        this.xslate = new xslate.Xslate({runner: './stuff/runner.pl'})
      })
      describe('xslate.options', function () {
        it('should be {syntax: "Kolon", cartonExec: false, runner: "./stuff/runner.pl"}', function () {
          assert.deepEqual(this.xslate.options, {
            cartonExec: false,
            syntax: "Kolon",
            runner: "./stuff/runner.pl",
            path: null,
          })
        })
      })
      describe('xslate.createCommand("path/to.tx")', function () {
        it('should be `./stuff/runner.pl --syntax=TTerse path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx'),
            './stuff/runner.pl --syntax=Kolon path/to.tx'
          )
        })
      })
      describe('xslate.createCommand("path/to.tx", {name: "hoge"})', function () {
        it('should be `xslate --syntax=Kolon --define \'name=hoge\' path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            './stuff/runner.pl --syntax=Kolon --define \'name=hoge\' path/to.tx'
            )
        })
      })
    })
    describe('new Xslate({path: "path/to"})', function () {
      beforeEach(function () {
        this.xslate = new xslate.Xslate({path: 'path/to'})
      })
      describe('xslate.options', function () {
        it('should be {syntax: "Kolon", cartonExec: false, runner: "./stuff/runner.pl"}', function () {
          assert.deepEqual(this.xslate.options, {
            cartonExec: false,
            syntax: "Kolon",
            runner: "xslate",
            path:   'path/to',
          })
        })
      })
      describe('xslate.createCommand("path/to.tx")', function () {
        it('should be `xslate --syntax=TTerse --path=path/to path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx'),
            'xslate --syntax=Kolon --path=\'path/to\' path/to.tx'
          )
        })
      })
      describe('xslate.createCommand("path/to.tx", {name: "hoge"})', function () {
        it('should be `xslate --syntax=Kolon --path=\'path/to\' --define \'name=hoge\' path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'xslate --syntax=Kolon --path=\'path/to\' --define \'name=hoge\' path/to.tx'
            )
        })
      })
    })
    describe('exec', function () {
      describe('syntax=Kolon', function () {
        it('should be `hello xslate!`', function (done) {
          var runner = new xslate.Xslate({cartonExec: false, syntax: 'Kolon'})
          runner.exec('./test/lib/stuff/kolon.tx', {name: 'xslate'}).then(function (content) {
            assert(content, 'hello xslate!')
            done()
          })
        })
      })
      describe('syntax=TTerse', function () {
        it('should be `hello xslate!`', function (done) {
          var runner = new xslate.Xslate({cartonExec: false, syntax: 'TTerse'})
          runner.exec('./test/lib/stuff/tterse.tx', {name: 'xslate'}).then(function (content) {
            assert(content, 'hello xslate!')
            done()
          })
        })
      })
      describe('customized runner', function () {
        it('should be `hello xslate!`', function (done) {
          var runner = new xslate.Xslate({cartonExec: false, runner: 'perl ./test/lib/stuff/runner.pl'})
          runner.exec('./test/lib/stuff/tterse.tx', {name: 'xslate'}).then(function (content) {
            assert(content, 'hello xslate!')
            done()
          }).catch(function (err) { console.log(err) })
        })
      })
      describe('failed compile', function () {
        it('should be called reject', function (done) {
          var runner = new xslate.Xslate({cartonExec: false, syntax: 'TTerse'})
          runner.exec('./test/lib/stuff/tterse.tx', {}).catch(function (err) {
            done()
          })
        })
      })
    })
    describe('xslate.formatter', function () {
      beforeEach(function () {
        this.xslate = new xslate.Xslate()
      })
      it('should be define formatted', function () {
        this.xslate.setFormatter(function (value, name) {
          assert.equal(name, 'name')
          assert.equal(value, 'value')
          return 'customized '+value
        })
        var command = this.xslate.createCommand('path/to.tx', {
          name: 'value'
        })
        assert.equal(command, 'xslate --syntax=Kolon --define \'name=customized value\' path/to.tx')
      })
    })
  })
})

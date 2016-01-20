var assert = require('power-assert')
var path   = require('path'),
    fs     = require('fs')

var xslate = require('../lib/xslate')

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
        it('should be `xslate --syntax=Kolon --define "name=hoge" path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'xslate --syntax=Kolon --define "name=hoge" path/to.tx'
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
        it('should be `carton exec xslate --syntax=Kolon --define "name=hoge" path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'carton exec xslate --syntax=Kolon --define "name=hoge" path/to.tx'
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
        it('should be `xslate --syntax=TTerse --define "name=hoge" path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'xslate --syntax=TTerse --define "name=hoge" path/to.tx'
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
        it('should be `xslate --syntax=Kolon --define "name=hoge" path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            'xslate --syntax=Kolon --define "name=hoge" path/to.tx'
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
        it('should be `xslate --syntax=Kolon --define "name=hoge" path/to.tx`', function () {
          assert.equal(
            this.xslate.createCommand('path/to.tx', {name: 'hoge'}),
            './stuff/runner.pl --syntax=Kolon --define "name=hoge" path/to.tx'
            )
        })
      })
    })
    describe('exec', function () {
      describe('syntax=Kolon', function () {
        it('should be `hello xslate!`', function (done) {
          var runner = new xslate.Xslate({cartonExec: false, syntax: 'Kolon'})
          runner.exec('./test/stuff/kolon.tx', {name: 'xslate'}).then(function (content) {
            assert(content, 'hello xslate!')
            done()
          })
        })
      })
      describe('syntax=TTerse', function () {
        it('should be `hello xslate!`', function (done) {
          var runner = new xslate.Xslate({cartonExec: false, syntax: 'TTerse'})
          runner.exec('./test/stuff/tterse.tx', {name: 'xslate'}).then(function (content) {
            assert(content, 'hello xslate!')
            done()
          })
        })
      })
      describe('customized runner', function () {
        it('should be `hello xslate!`', function (done) {
          var runner = new xslate.Xslate({cartonExec: false, runner: 'perl ./test/stuff/runner.pl'})
          runner.exec('./test/stuff/tterse.tx', {name: 'xslate'}).then(function (content) {
            assert(content, 'hello xslate!')
            done()
          }).catch(function (err) { console.log(err) })
        })
      })
      describe('failed compile', function () {
        it('should be called reject', function (done) {
          var runner = new xslate.Xslate({cartonExec: false, syntax: 'TTerse'})
          runner.exec('./test/stuff/tterse.tx', {}).catch(function (err) {
            done()
          })
        })
      })
    })
  })
})

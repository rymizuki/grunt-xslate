var assert = require('power-assert')
var fs    = require('fs')

describe('grunt-xslate', function () {
  describe('tterse', function () {
    it('should be exists xslate task', function () {
      assert.equal(fs.readFileSync('./test/expect/tterse.txt', 'utf8'), "num:  1000\nstr:  hello world\nbool: true\n")
    })
  })
  describe('kolon', function () {
    it('should be exists xslate task', function () {
      assert.equal(fs.readFileSync('./test/expect/kolon.txt', 'utf8'), "num:  1000\nstr:  hello world\nbool: true\n")
    })
  })
})

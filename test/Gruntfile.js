module.exports = function (grunt) {
  grunt.loadTasks('../tasks')
  grunt.initConfig({
    xslate: {
      options: {
        data: {
          number: 1000,
          string: 'hello world',
          boolean: true,
        }
      },
      tterse: {
        options: { syntax: 'TTerse' },
        files: {
          './expect/tterse.txt': './fixture/tterse.tx'
        }
      },
      kolon: {
        options: { syntax: 'Kolon' },
        files: {
          './expect/kolon.txt': './fixture/kolon.tx'
        }
      }
    }
  })
}

# grunt-xslate

Compile Text::Xslate template files from Grunt.

[![npm version](https://badge.fury.io/js/grunt-xslate.svg)](http://badge.fury.io/js/grunt-xslate) 
[![Build Status](https://travis-ci.org/rymizuki/grunt-xslate.svg?branch=master)](https://travis-ci.org/rymizuki/grunt-xslate) 

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-xslate --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-xslate');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*

and install `xslate` command or your command.

```shell
cpanm Text::Xslate
```

## Xslate task

_Run this task with the `grunt xslate` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### cartonExec

Enebale to `carton exec` command.
If you are using a `carton`, you should enable.

#### runner

Rather than `xslate` command, you can run the perl command that you have defined.
write your perl, and grant excute authority.

e.g.

```perl
#!/usr/bin/env perl
use Text::Xslate;
my ($template_path, ) = @ARGV;
my $engine = Text::Xslate->new(%your_options);
print $engine->render(template_path, \%your_arguments);
```
```shell
chmod 755 bin/your-engine.pl
```

#### data

Define template variables.
This will be passed to `define` option of `xslate` command.

#### syntax

You can specified template syntax.(e.g. Kolon)

#### formatter

You can rocess the data to be specified `define`

```json
{
  xslate: {
    example: {
      options: {
        formatter: function (value, name) {
          return JSON.stringify(value) // --define="foo={"fuga":1000, "hoge":2000}"
        },
        data: {
          foo: {
            fuga: 1000,
            hoge: 2000,
          }
        }
      }
    }
  }
}
```

### Usage Example

```js
xslate: {
  basic: {
    options: {
      cartonExec: true,
      data: {
        content: 'this is the message!',
      }
    },
    files:
      'dist/output.html': 'src/input.tx'
  },
  original: {
    options: {
      cartonExec: true,
      syntax:     null,
      runner:     'bin/my-xslate',
    },
    files: [
      expand:  true,
      flatten: true,
      ext:     '.html',
      src:     '**/*.tx',
      dest:    'dist/'
    ]
  }
}
```

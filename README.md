# karma-wrap-preprocessor [![Build Status](https://travis-ci.org/wilsonjackson/karma-wrap-preprocessor.svg?branch=master)](https://travis-ci.org/wilsonjackson/karma-wrap-preprocessor)

> Wrap files with a lodash template.

## Installation

    npm install --save-dev karma-wrap-preprocessor

## Configuration

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    files: [
      'app/**/*.js',
      'test/**/*.js'
    ],

    preprocessors: {
      'app/**/*.js': ['wrap']
    },

    wrapPreprocessor: {
      // Example: wrap each file in an IIFE
      template: '(function () { <%= contents %> })()',

      // Other options:

      // Use an external template file instead of an inline string:
      file: 'path/to/tpl.txt',

      // Change the variable replaced by file contents (default value is 'contents'):
      variable: 'file',

      // Pass options to lodash template function (see https://lodash.com/docs#template):
      options: {}
    }
  });
};
```

## License

MIT

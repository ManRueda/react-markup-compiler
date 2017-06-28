'use strict'
const ReactDOMServer = require('react-dom/server')
const path = require('path')

class ReactMarkupCompiler {
  constructor (options) {
    if (arguments.length > 1) {
      throw new Error('ReactMarkupCompiler only takes one argument (pass an options object)')
    }

    if (typeof options === 'string') {
      options = {
        entry: options
      }
    }

    this.options = options || {}

    this.options.filename = this.options.filename || this.defaultFilename()
  }

  apply (compiler) {
    this.normalizePaths(this.options, compiler)
    const options = this.options

    if (compiler.options.devServer && compiler.options.devServer.inline !== false) {
      throw new Error('Sorry, ReactMarkupCompiler does not work with webpack-dev-server in inline mode... yet')
    }

    compiler.plugin('emit', (compilation, callback) => {
      for (let fileName in compilation.assets) {
        if (options.entry === fileName) {
          const asset = compilation.assets[fileName]
          let reactRootComponent
          try {
            reactRootComponent = eval(asset.source()).default()
          } catch (err) {
            return callback()
          }
          const code = '<!DOCTYPE html>\n' + ReactDOMServer.renderToStaticMarkup(reactRootComponent)

          compilation.fileDependencies.push(options.filename)
          compilation.assets[options.filename] = {
            source: () => code,
            size: () => code.length
          }
        }
      }
      callback(null, compilation)
    })
  }
  normalizePaths (options, compiler) {
    if (path.resolve(options.filename) === path.normalize(options.filename)) {
      options.filename = path.relative(compiler.options.output.path, options.filename)
    }
  }
  defaultFilename () {
    return `${path.basename(this.options.entry, path.extname(this.options.entry))}.html`
  }
}

module.exports = ReactMarkupCompiler

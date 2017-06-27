const ReactDOMServer = require('react-dom/server')
const path = require('path')

function ReactMarkupCompiler (assets) {
  this.assets = assets
}

ReactMarkupCompiler.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('additional-assets', (callback) => {
      for (let fileName in compilation.assets) {
        if (this.assets.includes(fileName)) {
          const source = compilation.assets[fileName].node()

          const def = eval(source.toString())
          const code = ReactDOMServer.renderToStaticMarkup(def.default())

          const outputName = `${path.basename(fileName, path.extname(fileName))}`
          compilation.fileDependencies.push(`${outputName}.html`)
          compilation.assets[`${outputName}.html`] = {
            source: () => code,
            size: () => code.length
          }
        }
      }
      callback()
    })
  })
}

module.exports = ReactMarkupCompiler

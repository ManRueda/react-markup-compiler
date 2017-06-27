const cheerio = require('cheerio')

module.exports = function (request) {
  if (this.cacheable) {
    this.cacheable()
  }

  const svgCode = request
  const $ = cheerio.load(svgCode)
  const attrs = $('svg').attr()
  attrs.style = convertCssObjectToReact($('svg').css())
  attrs.dangerouslySetInnerHTML = { __html: $('svg').html() }

  return `
    const React = require('react')
    const attrs = ${JSON.stringify(attrs)}

    module.exports = () => React.createElement('svg', attrs, null)
  `
}

function convertCssObjectToReact (css) {
  let out = {}
  for (var variable in css) {
    out[parseCssPropName(variable)] = css[variable]
  }
  return out
}

function parseCssPropName (css) {
  let [name] = css.split(':')
  name = name.split('-').map((p, i) => i > 0 ? p[0].toUpperCase() + p.substring(1) : p).join('')
  return name
}

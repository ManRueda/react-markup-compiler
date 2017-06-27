const loaderUtils = require('loader-utils')
module.exports = () => {}
module.exports.pitch = function (request) {
  if (this.cacheable) {
    this.cacheable()
  }

  return `
    const React = require('react')
    const code = require(${loaderUtils.stringifyRequest(this, '!!' + request)})
    module.exports = () => React.createElement('style', {
      rel: 'stylesheet',
      dangerouslySetInnerHTML: { __html: code }
    }, null)
    `
}

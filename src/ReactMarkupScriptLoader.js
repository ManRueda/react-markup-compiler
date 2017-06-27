module.exports = function (request, sourceMap) {
  if (this.cacheable) {
    this.cacheable()
  }
  let sourceMapURI = ''
  if (sourceMap) {
    sourceMapURI = '//# sourceMappingURL=data:application/json;base64,' + Buffer.from(JSON.stringify(sourceMap)).toString('base64')
  }
  return `
    const React = require('react')
    // CODE + SOURCE MAP
    const code = ${JSON.stringify(request)}+${JSON.stringify(sourceMapURI)}
    module.exports = () => React.createElement('script', {
      type: 'text/javascript',
      dangerouslySetInnerHTML: { __html: code }
    }, null)
    `
}

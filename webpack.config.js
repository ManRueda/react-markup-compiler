const path = require('path')
const ReactMarkupCompiler = require('./src/ReactMarkupCompiler.js')

module.exports = {
  entry: './example/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'example-dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.inline.js$/,
        exclude: /node_modules/,
        loader: [
          './src/ReactMarkupScriptLoader.js',
          'babel-loader'
        ] },
      {
        test: /\.(png|jpg|gif|ttf)$/,
        use: [
          { loader: 'file-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: [
          './src/ReactMarkupStyleLoader.js',
          'css-loader'
        ]
      },
      {
        test: /\.svg/,
        use: [
          './src/ReactMarkupSvgLoader.js'
        ]
      }
    ]
  },
  plugins: [
    new ReactMarkupCompiler(['index.js'])
  ]
}

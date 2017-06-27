# react-markup-compiler

This is an simple set of plugins and loaders for webpack to create basic static sites from React functional components.

## ReactMarkupCompiler
This plugin will create the static HTML file with all the content in the output directory.

The only parameter is an array with the entries file names used to create pages. This allow to create multi-pages sites.

The entrypoint must export as default a functional React component

### Usage

```javascript
{
  plugins: [
    new ReactMarkupCompiler(['index.js'])
  ]
}
```

## ReactMarkupStyleLoader

This loader must be used to work with `ReactMarkupCompiler`. Will load the styles and add it in an `style` tag in the html.

It works with `css-loader` to resolve fonts and images

### Usage

```javascript
import StyleTag from './assets/my-logo.css'

export default () => (<StyleTag />)
```

```javascript
{
  test: /\.css$/,
  use: [
    'react-markup-compiler/style-loader',
    'css-loader'
  ]
}
```


## ReactMarkupScriptLoader

This loader must be used to work with `ReactMarkupCompiler`. Will load the javascript and add it in an `script` tag in the html.

It works with `babel` to transpile the code

### Usage

```javascript
import ScriptTag from './assets/script.inline.js'

export default () => (<ScriptTag />)
```

```javascript
{
  test: /\.inline.js$/,
  use: [
    'react-markup-compiler/script-loader',
    'babel-loader'
  ]
}
```

## ReactMarkupSvgLoader

This loader will insert svg files inline in the html.

It works with `css-loader` to resolve fonts and images

### Usage

```javascript
import MyLogo from './assets/my-logo.svg'

export default () => (<MyLogo />)
```

```javascript
{
  test: /\.svg/,
  use: [
    './src/react-markup-compiler/svg-loader'
  ]
}
```

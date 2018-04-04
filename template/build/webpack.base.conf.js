'use strict'

const { join, resolve } = require('path')
const webpack = require('webpack')
const glob = require('glob')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})
{{#less}}
const extractLESS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})
{{/less}}
{{#sass}}
const extractSASS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})
{{/sass}}

const entries = {}
const chunks = []
const htmlWebpackPluginArray = []
glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  entries[chunk] = path
  chunks.push(chunk)

  const filename = chunk + '.html'
  const htmlConf = {
    filename: filename,
    template: path.replace(/.js/g, '.html'),
    inject: 'body',
    favicon: './src/assets/img/logo.png',
    hash: true,
    chunks: ['commons', chunk]
  }
  htmlWebpackPluginArray.push(new HtmlWebpackPlugin(htmlConf))
})

const config = {
  entry: entries,
  output: {
    path: resolve(__dirname, '../dist'),
    filename: 'assets/js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      assets: join(__dirname, '../src/assets'),
      components: join(__dirname, '../src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader'],
              fallback: 'style-loader'
            })),
            {{#less}}
            less: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader', 'less-loader'],
              fallback: 'style-loader'
            })),
            {{/less}}
            {{#sass}}
            scss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader', 'sass-loader'],
              fallback: 'style-loader'
            })),
            {{/sass}}
            postcss: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader'],
              fallback: 'style-loader'
            }))
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        }))
      },
      {{#less}}
      {
        test: /\.less$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'less-loader'],
          fallback: 'style-loader'
        }))
      },
      {{/less}}
      {{#sass}}
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallback: 'style-loader'
        }))
      },
      {{/sass}}
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 3,
          name: 'commons',
          enforce: true
        }
      }
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    {{#less}}
    extractLESS,
    {{/less}}
    {{#sass}}
    extractSASS,
    {{/sass}}
    extractCSS
  ]
}
config.plugins = [...config.plugins, ...htmlWebpackPluginArray]
module.exports = config

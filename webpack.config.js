const { join, resolve } = require('path')
const webpack = require('webpack')
const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

const entries = {}
const chunks = []
glob.sync('./src/pages/**/*.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('.js')[0]
  entries[chunk] = path
  chunks.push(chunk)
})

const config = {
  entry: entries,
  output: {
    path: resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      assets: join(__dirname, '/src/assets'),
      components: join(__dirname, '/src/components'),
      root: join(__dirname, 'node_modules')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'style-loader'
            })
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
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
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].css',
      allChunks: true
    })
  ],
  devServer: {
    host: '127.0.0.1',
    port: 8010,
    historyApiFallback: false,
    noInfo: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  },
  devtool: '#eval-source-map'
}

glob.sync('./src/pages/**/*.html').forEach(path => {
  const filename = path.split('./src/pages/')[1].split('/app.html')[0] + '.html'
  const chunk = path.split('./src/pages/')[1].split('.html')[0]
  const htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    favicon: './src/assets/img/logo.png',
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk]
  }
  config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = config

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}

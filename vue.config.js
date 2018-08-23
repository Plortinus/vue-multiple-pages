'use strict'
const titles = require('./title.js')
const glob = require('glob')
const pages = {}

glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  pages[chunk] = {
    entry: path,
    template: 'public/index.html',
    title: titles[chunk],
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
module.exports = {
  pages,
  chainWebpack: config => config.plugins.delete('named-chunks'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}

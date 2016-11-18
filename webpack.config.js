var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

var entries = getEntry();
var chunks = getChunkName();

var config = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    //配置别名，在项目中可缩减引用路径
    extensions: ['.js', '.vue'],
    alias: {
      assets: path.join(__dirname,'/app/assets'),
      components: path.join(__dirname,'/app/components'),
      root: path.join(__dirname, 'node_modules')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/, loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: 1
    }),
    new ExtractTextPlugin({
      filename: 'assets/css/main.css',
      allChunks: true
    })
  ],
  devServer: {
    historyApiFallback: false,
    noInfo: true,
    // proxy: {
    //   '/github': {
    //     target: 'https://github.com/github',
    //     changeOrigin: true,
    //     pathRewrite: {'^/github' : ''}
    //   }
    // },
  },
  devtool: '#eval-source-map'
};

var pages = getHtmls();
pages.forEach(function (pathname) {
  // filename 用文件夹名字
  var conf = {
    filename: pathname.substring(6, pathname.length - 4) + '.html', //生成的html存放路径，相对于path
    template: 'app/' + pathname + '.html', //html模板路径
  };
  var chunk = pathname.substring(6, pathname.length);
  if (chunks.indexOf(chunk) > -1) {
    conf.inject = 'body';
    conf.chunks = ['vendors', chunk];
    conf.hash = true;
  }
  config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;

function getEntry() {
  var entry = {};
  glob.sync('./app/pages/**/*.js').forEach(function (name) {
    var n = name.slice(name.lastIndexOf('app/') + 10, name.length -3);
    entry[n] = [name];
  });
  return entry;
}
function getChunkName () {
  var entry = [];
  glob.sync('./app/pages/**/*.js').forEach(function (name) {
    var n = name.slice(name.lastIndexOf('app/') + 10, name.length - 3);
    entry.push(n);
  });
  return entry;
}
function getHtmls() {
  var entry = [];
  glob.sync('./app/pages/**/*.html').forEach(function (name) {
    var n = name.slice(name.lastIndexOf('app/') + 4, name.length - 5);
    entry.push(n);
  });
  return entry;
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
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
  ]);
}

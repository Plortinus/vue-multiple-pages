# vue-multiple-pages

**A modern Vue.js multiple pages cli which uses Vue 2, Webpack2, and Element-UI**

## Features

1. [Vue2](https://github.com/vuejs/vue)
2. [Webpack2](https://github.com/webpack/webpack)
3. [ElementUI](https://github.com/ElemeFE/element)
4. [Eslint](https://github.com/eslint/eslint)([eslint-config-vue](https://github.com/vuejs/eslint-config-vue) default)
5. [Postcss](https://github.com/postcss/postcss)([autoprefixer](https://github.com/postcss/autoprefixer) default)
6. [Less](http://lesscss.org/)
7. [sass](https://github.com/webpack-contrib/sass-loader)

## Get Started

### [vue-cli](https://github.com/vuejs/vue-cli)

#### Init Project

``` bash
$ npm install -g vue-cli
$ vue init Plortinus/vue-multiple-pages new-project
$ cd new-project
$ npm install
```

#### Dev

```bash
# serve with hot reload at localhost:8010
$ npm run dev
```

visit [http://localhost:8010/user/login.html](http://localhost:8010/user/login.html)

visit [http://localhost:8010/user/index.html](http://localhost:8010/user/index.html)

visit [http://localhost:8010/customer/index.html](http://localhost:8010/customer/index.html)

#### Build

```bash
$ npm run build
$ node server.js #listen 2333 port
```

visit [http://localhost:2333/user/login.html](http://localhost:2333/user/login.html)

visit [http://localhost:2333/user/index.html](http://localhost:2333/user/index.html)

visit [http://localhost:2333/customer/index.html](http://localhost:2333/customer/index.html)


## Root Folder Structure

```bash
├── src  # main folder
│   ├── assets  # common assets folder
│   │   ├── img
│   │   │   └── logo.png
│   │   ├── js
│   │   └── css
│   ├── components # common components folder
│   │   └── modal.vue
│   └── pages  # pages
│       ├── user  # user part (folder name can be customized)
│       │   ├── login # login.html (folder name can be customized)
│       │   │   ├── app.js   # entry js (file name can't be customized unless you change the webpack.config.js)
│       │   │   ├── app.vue  # login vue (file name can be customized)
│       │   │   └── app.html # template html (file name can't be customized unless you change the webpack.config.js)
│       │   └── index # index.html
│       │       ├── app.js
│       │       ├── app.html
│       │       └── app.vue
│       └── customer # customer part (folder name can be customized)
│           └── home # home.html
│               ├── app.html
│               ├── app.js
│               └── app.vue
├── LICENSE
├── .babelrc          # babel config (es2015 default)
├── .eslintrc.js      # eslint config (eslint-config-vue default)
├── server.js         # port 2333
├── package.json
├── postcss.config.js # postcss (autoprefixer default)
├── webpack.config.js
└── README.md
```

## Dist Folder Structure

```bash
├── assets
│   ├── css
│   │   ├── customer
│   │   │   ├── home.css
│   │   │   └── home.css.map
│   │   ├── user
│   │   │   ├── index.css
│   │   │   ├── index.css.map
│   │   │   ├── login.css
│   │   │   └── login.css.map
│   │   ├── vendors.css
│   │   └── vendors.css.map
│   └── js
│       ├── customer
│       │   └── home.js
│       ├── user
│       │   ├── index.js
│       │   └── login.js
│       └── vendors.js
├── b02bdc1b846fd65473922f5f62832108.ttf
├── customer
│   └── home.html
├── logo.png
└── user
    ├── index.html
    └── login.html
```

## How The `Multiple Page` Works ?(Assumed that you have the basic knowlege of [webpack](https://github.com/webpack/webpack))

1. Firstly, we need to get the `entries` and `chunks`

    * The constant `entries` is an [Object](https://webpack.js.org/configuration/entry-context/#entry) type, it's prop is the `chunk` and it's value is the relative path of the entry js file
    * The constant `chunks` is an Array type for the [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/)

    This step needs a package called: [glob](https://github.com/isaacs/node-glob)
    ```js
    const entries = {}
    const chunks = []
    glob.sync('./src/pages/**/app.js').forEach(path => {
      // Get all the entry js files and forEach them

      const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
      // E.g, chunk = 'user/index' path = './src/pages/user/index/app.js'

      entries[chunk] = path
      // Now we got the entries

      chunks.push(chunk)
      // Then, we collect the chunks for CommonsChunkPlugin
    })
    // ...
    const config = {
      entry: entries, // The constant entries is used here
      plugins: [
        new CommonsChunkPlugin({
          name: 'vendors',
          filename: 'assets/js/vendors.js',
          chunks: chunks, // The constant chunks is used here
          minChunks: chunks.length
        })
        // ...
      ],
    }
    ```

2. Then,combine the `html template file` with the right `chunk`

  The second step,we use the webpack plugin: [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

  ```js
  // ...
  const config = {
    // ...
  }
  // ...
  glob.sync('./src/pages/**/app.html').forEach(path => {
    // Get all the html template files and forEach them
    // E.g, path = './src/pages/user/index/app.html'

    const chunk = path.split('./src/pages/')[1].split('/app.html')[0]
    // E,g. the chunk will be 'user/login'

    const filename = chunk + '.html'
    // E.g, the html filename will be 'user/index.html' in the 'dist' folder



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
  ```

## Inspired by [element-starter](https://github.com/ElementUI/element-starter)

## License

MIT

# vue-multiple-pages

**This project is a modern Vue.js starter
which uses Vue 2, Webpack2, and ElementUI**

## Features

1. [Vue2](https://github.com/vuejs/vue)
2. [Webpack2](https://github.com/webpack/webpack)
3. [ElementUI](https://github.com/ElemeFE/element)
4. [Eslint](https://github.com/eslint/eslint)

## Start

 - Clone or download this repository
 - Enter your local directory, and install dependencies:

``` bash
npm install
```

## Dev

``` bash
# serve with hot reload at localhost:8010
npm run dev

```

[http://localhost:8010/user/login.html](http://localhost:8010/user/login.html)

[http://localhost:8010/user/index.html](http://localhost:8010/user/index.html)

## Build

``` bash
# build for production with minification
npm run build
node server.js
```

[http://localhost:2333/user/login.html](http://localhost:2333/user/login.html)

## Folder Structure

```bash
├── src             # main
│    ├── assets     # source
│    │    ├── css   # css
│    │    └── img   # img
│    ├── components # components
│    └── pages      # pages
│         └── user  # user part
│              ├── index  # index.html
│              │    ├── app.js    # entry js
│              │    ├── app.html  # html template
│              │    └── app.vue   # main vue for login
│              └── login  # login.html
│                   ├── app.js    # entry js
│                   ├── app.html  # html template
│                   └── app.vue   # main vue for login
├── dist            # npm run build result
├── node_modules    # dependencies
├── .babelrc        # babel config
├── .eslintrc.js    # eslint config
├── server.js       # port 2333
├── webpack.config.js # webpack config
├── node_modules    # dependencies
└── package.json    # package info
```

## License
MIT

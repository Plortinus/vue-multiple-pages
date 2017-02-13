# vue-multiple-pages

>Vue2.0多页应用

## Links 依赖链接

1. [Vue](https://github.com/vuejs/vue)
2. [Webpack](https://github.com/webpack/webpack)
3. [Element](https://github.com/ElemeFE/element)

## Start 开始

 - Clone or download this repository
 - Enter your local directory, and install dependencies:

``` bash
npm install
```

## Develop 开发构建

``` bash
# serve with hot reload at localhost:8080
npm run dev

```

[http://localhost:8010/user/login.html](http://localhost:8010/user/login.html)

[http://localhost:8010/user/index.html](http://localhost:8010/user/index.html)

## Build 生产构建

``` bash
# build for production with minification
npm run build
node server.js
```

[http://localhost:2333/user/login.html](http://localhost:2333/user/login.html)

## Folder Structure 文件目录

```bash
├── src             # 主目录
│    ├── assets     # 资源目录
│    │    ├── css   # css
│    │    └── img   # 图片目录
│    ├── components # 自定义组件目录
│    └── pages      # 页面目录
│         └── user  # 业务模块目录
│              ├── index  # index 页面
│              │    ├── app.js    # 入口js
│              │    ├── app.html  # html模板
│              │    └── app.vue   # index 页面组件
│              └── login  # login 页面
│                   ├── app.js    # 入口js
│                   ├── app.html  # html模板
│                   └── app.vue   # login 页面组件
├── dist            # npm run build生成的目录
├── node_modules    # dependencies
├── .babelrc        # babel文件
├── server.js       # 用于查看npm run build的server.js，端口2333
├── webpack.config.js # webpack配置目录
├── node_modules    # dependencies
└── package.json    # package info
```

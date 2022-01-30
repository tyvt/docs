# 操作指南

## vuepress目录结构

```
.
├── docs
│   ├── .vuepress
│   │   ├── components // 该目录中的 Vue 组件将会被自动注册为全局组件
|   |   |
│   │   ├── directives // 自定义指令
|   |   |
│   │   ├── public // 静态资源目录
|   |   |
│   │   ├── templates // HTML 模板文件
│   │   │   ├── dev.html // 用于开发环境的 HTML 模板文件
│   │   │   └── ssr.html // 构建时基于 Vue SSR 的 HTML 模板文件
|   |   |
│   │   ├── config.js
│   │   └── enhanceApp.js // 提供了vue构造函数，组件需要的依赖可在此引入
│   │
│   ├── guide (自定义)
|   |
│   ├── components (自定义)
|   |
│   └── README.md // 首页
│ 
└── package.json
```

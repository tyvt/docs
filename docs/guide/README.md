# 操作指南

## vuepress目录结构

```
.
├── docs
│   ├── .vuepress
│   │   ├── components // 该目录中的 Vue 组件将会被自动注册为全局组件
|   |   |
│   │   ├── public // 静态资源目录
|   |   |
│   │   ├── templates // HTML 模板文件
│   │   │   ├── dev.html // 用于开发环境的 HTML 模板文件
│   │   │   └── ssr.html // 构建时基于 Vue SSR 的 HTML 模板文件
|   |   |
│   │   ├── config.js
│   │   └── enhanceApp.js
│   │
│   ├── guide (自定义)
|   |
│   ├── components (自定义)
|   |
│   └── README.md // 首页
│ 
└── package.json
```

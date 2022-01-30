// https://vuepress.vuejs.org/zh/config/#%E5%9F%BA%E6%9C%AC%E9%85%8D%E7%BD%AE

module.exports = {
    title: '开发文档',
    description: '',
    base: '/',
    port: '8081',
    // build的输出目录
    // dest: '',
    themeConfig: {
        nav: [
            {
                text: '首页',
                link: '/'
            },
            {
                text: '组件',
                link: '/components/'
            },
            {
                text: '指南',
                link: '/guide/'
            }
        ],
        sidebar: 'auto'
    },
    // 需要被注入到 <head> 中的标签
    head: [],
    plugins: [
        'demo-container',
        ["vuepress-plugin-auto-sidebar", {}]
    ],
    markdown: {}
}
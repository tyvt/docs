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
                text: 'Home',
                link: '/'
            },
            {
                text: 'chapter',
                link: '/chapter1/'
            }
        ],
        sidebar: {
            '/chapter1/': [
                '',
                'one'
            ]
        }
    },
    // 需要被注入到 <head> 中的标签
    head: [],
    plugins: ['demo-container'],
    markdown: {}
}
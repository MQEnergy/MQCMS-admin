const pre = '/tag/';

export default {
    path: '/tag',
    title: '标签管理',
    header: 'application-index',
    icon: 'md-pricetags',
    custom: 'i-icon-demo i-icon-demo-list',
    children: [
        {
            path: `${pre}index`,
            title: '标签列表'
        }
    ]
}

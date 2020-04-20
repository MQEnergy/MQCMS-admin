const pre = '/portal/';

export default {
    path: '/portal',
    title: '门户管理',
    header: 'application-index',
    icon: 'md-albums',
    custom: 'i-icon-demo i-icon-demo-list',
    children: [
        {
            path: `${pre}post`,
            title: '文章管理'
        },
        {
            path: `${pre}post/create`,
            title: '添加文章'
        },
        {
            path: `${pre}category`,
            title: '分类管理'
        },
        {
            path: `${pre}tag`,
            title: '文章标签'
        },
        {
            path: `${pre}comment`,
            title: '评论管理'
        }
    ]
}

const pre = '/post/';

export default {
    path: '/post',
    title: '内容管理',
    header: 'application-index',
    icon: 'md-albums',
    custom: 'i-icon-demo i-icon-demo-list',
    children: [
        {
            path: `${pre}index`,
            title: '内容列表'
        }
    ]
}

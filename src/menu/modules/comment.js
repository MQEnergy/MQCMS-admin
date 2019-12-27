const pre = '/comment/';

export default {
    path: '/comment',
    title: '评论管理',
    header: 'application-index',
    icon: 'md-happy',
    custom: 'i-icon-demo i-icon-demo-list',
    children: [
        {
            path: `${pre}index`,
            title: '评论列表'
        }
    ]
}

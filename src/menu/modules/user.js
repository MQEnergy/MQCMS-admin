const pre = '/user/';

export default {
    path: '/user',
    title: '用户管理',
    header: 'home',
    icon: 'md-contact',
    custom: 'i-icon-demo i-icon-demo-list',
    children: [
        {
            path: `${pre}index`,
            title: '用户列表'
        }
    ]
}

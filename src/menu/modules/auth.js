const pre = '/auth/';

export default {
    path: '/auth',
    title: '权限管理',
    header: 'system-index',
    icon: 'md-apps',
    custom: 'i-icon-demo i-icon-demo-list',
    children: [
        {
            path: `${pre}index`,
            title: '管理员管理'
        },
        {
            path: `${pre}detail`,
            title: '管理员详情',
            hidden: true
        },
        {
            path: `${pre}menu`,
            title: '权限管理'
        },
        {
            path: `${pre}role`,
            title: '角色管理'
        }
    ]
}

const pre = '/permission/';

export default {
    path: '/permission',
    title: '权限管理',
    header: 'system-index',
    icon: 'md-apps',
    children: [
        {
            path: `${pre}admin`,
            title: '管理员管理'
        },
        {
            path: `${pre}role`,
            title: '角色管理'
        },
        {
            path: `${pre}menu`,
            title: '菜单管理'
        }
    ]
}

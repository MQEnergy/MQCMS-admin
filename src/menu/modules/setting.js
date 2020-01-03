const pre = '/setting/';

export default {
    path: '/setting',
    title: '设置管理',
    header: 'system-index',
    custom: 'i-icon-demo i-icon-demo-setting',
    children: [
        {
            path: `${pre}user`,
            title: '个人中心'
        },
        {
            path: `${pre}account`,
            title: '个人设置'
        }
    ]
}

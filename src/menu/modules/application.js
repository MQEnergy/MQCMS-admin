const pre = '/application/';

export default {
    path: '/application',
    title: '应用管理',
    header: 'application-index',
    icon: 'md-photos',
    custom: 'i-icon-demo i-icon-demo-list',
    children: [
        {
            path: `${pre}index`,
            title: '我的应用'
        },
        {
            path: `${pre}store`,
            title: '应用市场'
        }
    ]
}

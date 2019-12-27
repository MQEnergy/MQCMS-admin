// 菜单，顶栏

export default [
    {
        path: '/',
        title: '平台首页',
        icon: 'md-home',
        hideSider: false,
        name: 'home'
    },
    {
        path: '/log',
        title: '日志',
        icon: 'md-locate',
        hideSider: true,
        hideHeader: true, // 是否显示在顶部 true：不显示
        name: 'log'
    },
    {
        path: '/wechat',
        title: '微信公众号',
        icon: 'md-compass',
        hideSider: false,
        name: 'wechat-index'
    },
    {
        path: '/system',
        title: '系统管理',
        icon: 'md-construct',
        hideSider: false,
        name: 'system-index'
    },
    {
        path: '/application',
        title: '应用中心',
        icon: 'md-ionic',
        hideSider: false,
        name: 'application-index'
    }
];

const pre = '/setting/';

export default {
    path: '/setting',
    title: '设置管理',
    header: 'system-index',
    custom: 'i-icon-demo i-icon-demo-setting',
    children: [
        {
            path: `${pre}site`,
            title: '网站信息'
        },
        {
            path: `${pre}theme`,
            title: '模版管理'
        },
        {
            path: `${pre}navbar`,
            title: '导航管理'
        },
        {
            path: `${pre}slide`,
            title: '幻灯片管理'
        },
        {
            path: `${pre}link`,
            title: '友情链接'
        },
        {
            path: `${pre}upload`,
            title: '上传设置'
        },
        // {
        //     path: `${pre}html`,
        //     title: '页面静态化'
        // },
        {
            path: `${pre}clear-cache`,
            title: '缓存清理'
        },
        {
            path: `${pre}form`,
            title: '表单构建'
        },
        {
            path: `${pre}table`,
            title: '表格构建'
        }
    ]
}

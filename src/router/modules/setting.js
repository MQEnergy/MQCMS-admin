import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'setting-';

export default {
    path: '/setting',
    name: 'setting',
    redirect: {
        name: `${pre}user`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'site',
            name: `${pre}site`,
            meta: {
                ...meta,
                title: '网站信息'
            },
            component: () => import('@/pages/setting/site')
        },
        {
            path: 'theme',
            name: `${pre}theme`,
            meta: {
                ...meta,
                title: '模版管理'
            },
            component: () => import('@/pages/setting/theme')
        },
        {
            path: 'navbar',
            name: `${pre}navbar`,
            meta: {
                ...meta,
                title: '导航管理'
            },
            component: () => import('@/pages/setting/navbar')
        },
        {
            path: 'slide',
            name: `${pre}slide`,
            meta: {
                ...meta,
                title: '幻灯片管理'
            },
            component: () => import('@/pages/setting/slide')
        },
        {
            path: 'link',
            name: `${pre}link`,
            meta: {
                ...meta,
                title: '友情链接'
            },
            component: () => import('@/pages/setting/link')
        },
        {
            path: 'upload',
            name: `${pre}upload`,
            meta: {
                ...meta,
                title: '上传设置'
            },
            component: () => import('@/pages/setting/upload')
        },
        {
            path: 'clear-cache',
            name: `${pre}clear-cache`,
            meta: {
                ...meta,
                title: '清除缓存'
            },
            component: () => import('@/pages/setting/clear-cache')
        },
        {
            path: 'form',
            name: `${pre}form`,
            meta: {
                ...meta,
                title: '表单构建'
            },
            component: () => import('@/pages/setting/form')
        },
        {
            path: 'table',
            name: `${pre}table`,
            meta: {
                ...meta,
                title: '表格构建'
            },
            component: () => import('@/pages/setting/table')
        }
    ]
};

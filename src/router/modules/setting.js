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
            path: 'user',
            name: `${pre}user`,
            meta: {
                ...meta,
                title: '个人中心'
            },
            component: () => import('@/pages/setting/user')
        },
        {
            path: 'account',
            name: `${pre}account`,
            meta: {
                ...meta,
                title: '个人设置'
            },
            component: () => import('@/pages/setting/account')
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

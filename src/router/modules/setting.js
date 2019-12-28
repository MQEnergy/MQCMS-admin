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
        }
    ]
};

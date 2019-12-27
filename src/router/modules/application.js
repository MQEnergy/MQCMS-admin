import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'application-';

export default {
    path: '/application',
    name: 'application',
    redirect: {
        name: `${pre}index`
    },
    meta,
    component: BasicLayout,
    children: [
        {
            path: 'index',
            name: `${pre}index`,
            meta: {
                ...meta,
                title: '我的应用'
            },
            component: () => import('@/pages/application/index/index')
        },
        {
            path: 'store',
            name: `${pre}store`,
            meta: {
                ...meta,
                title: '应用市场'
            },
            component: () => import('@/pages/application/store/index')
        }
    ]
};

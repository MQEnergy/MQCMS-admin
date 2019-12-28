import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'user-';

export default {
    path: '/user',
    name: 'user',
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
                title: '用户列表'
            },
            component: () => import('@/pages/user/index')
        }
    ]
};

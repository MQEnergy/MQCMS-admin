import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'post-';

export default {
    path: '/post',
    name: 'post',
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
                title: '内容列表'
            },
            component: () => import('@/pages/post/index')
        }
    ]
};

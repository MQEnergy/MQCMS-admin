import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'comment-';

export default {
    path: '/comment',
    name: 'comment',
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
                title: '评论列表'
            },
            component: () => import('@/pages/comment/index')
        }
    ]
};

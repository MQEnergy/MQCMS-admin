import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'attachment-';

export default {
    path: '/attachment',
    name: 'attachment',
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
                title: '附件列表'
            },
            component: () => import('@/pages/attachment/index')
        }
    ]
};
